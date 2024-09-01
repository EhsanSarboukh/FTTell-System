import json #Provides functions for working with JSON data
from collections import Counter #A dictionary subclass for counting hashable objects
import sys #Provides access to some variables used or maintained by the Python interpreter
# args: ID (str): The identifier for the specific video whose emotion results are stored in a JSON file.
# This function reads emotion detection results from a JSON file, counts the occurrences of each emotion,and identifies the most frequent emotion.
def findMostFrequency(ID):
    #Open the JSON file containing emotion detection results for the given ID and load the data
    with open( './Emotion_Detection_FER/'+ID + '.json', "r") as file:
        data = json.load(file)

    # Count the occurrences of each emotion
    #Initialize a Counter object to count the occurrences of each emotion
    emotion_counts = Counter()
    #Iterate through each entry in the data (which represents detected emotions for each frame)
    for entry in data:
        emotion_counts.update(entry["emotions"])

    # Find the most frequent emotion
    most_frequent_emotion = max(emotion_counts, key=emotion_counts.get)

    print("The most frequent emotion is:", most_frequent_emotion)
    

