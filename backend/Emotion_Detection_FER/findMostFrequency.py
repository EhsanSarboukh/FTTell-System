import json
from collections import Counter
import sys
def findMostFrequency(ID):

    with open( './Emotion_Detection_FER/'+ID + '.json', "r") as file:
        data = json.load(file)

    # Count the occurrences of each emotion
    emotion_counts = Counter()

    for entry in data:
        emotion_counts.update(entry["emotions"])

    # Find the most frequent emotion
    most_frequent_emotion = max(emotion_counts, key=emotion_counts.get)

    print("The most frequent emotion is:", most_frequent_emotion)
    

