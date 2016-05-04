# Do not Store images in the database, rather store True or False
# and keep image names same as the primary key of the item
# Delete the images of the items that have been deleted
# =================================================================
# Have the images evaluated when they get uploaded
# Save the evaluated data in the table
# Such approach will allow much faster execution

from sklearn.cluster import KMeans
import numpy as np
import matplotlib.pyplot as plt
import cv2
import os
import webcolors
import zerorpc

class Color(object):
    def closest_colour(self,requested_colour):
        min_colours = {}
        for key, name in webcolors.css3_hex_to_names.items():
            r_c, g_c, b_c = webcolors.hex_to_rgb(key)
            rd = (r_c - requested_colour[0]) ** 2
            gd = (g_c - requested_colour[1]) ** 2
            bd = (b_c - requested_colour[2]) ** 2
            min_colours[(rd + gd + bd)] = name
        return min_colours[min(min_colours.keys())]

    def get_colour_name(self,requested_colour):
        try:
            closest_name = actual_name = webcolors.rgb_to_name(requested_colour)
        except ValueError:
            closest_name = self.closest_colour(requested_colour)
            actual_name = None
        return actual_name, closest_name

    def centroid_histogram(self,clt):
        numLabels = np.arange(0, len(np.unique(clt.labels_)) + 1)
        (percentage, _) = np.histogram(clt.labels_, bins = numLabels)

        percentage = percentage.astype("float")
        percentage /= percentage.sum()
        return percentage,clt.cluster_centers_

    def final_result(self,image_name):
        directory = "../public/itemImages/"

        image = cv2.imread(directory+image_name,1)

        originalSize = image.shape
        setSizeWidth = 480.0
        ratio = setSizeWidth/originalSize[1]
        newSizeHeight = originalSize[0]*ratio
        dimensions = (int(setSizeWidth),int(newSizeHeight))
        resized = cv2.resize(image, dimensions, interpolation = cv2.INTER_AREA)
        cv2.imwrite(directory+image_name,resized)

        image = cv2.imread(directory+image_name,1)
        image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)

        image_mat = image.reshape((image.shape[0] * image.shape[1], 3))
        clt = KMeans(n_clusters = 3)
        clt.fit(image_mat)

        percentage,color = self.centroid_histogram(clt)
        print(color)
        print(percentage)
        percentage1, color1 = self.get_colour_name(np.array(color[0]).tolist())
        percentage2, color2 = self.get_colour_name(np.array(color[1]).tolist())
        percentage3, color3 = self.get_colour_name(np.array(color[2]).tolist())
        print(percentage[0], color1)
        print(percentage[1], color2)
        print(percentage[2], color3)

        return color1, color2, color3

s = zerorpc.Server(Color())
s.bind("tcp://0.0.0.0:4242")
s.run()