import json
import matplotlib.pyplot as plt
import sys
import os
def createPlot(ID):
    # Read data from JSON file
    #json_path = os.path.join(os.path.dirname(__file__), ID + '.json')  # Adjust the path as needed
    #print(f"Current working directory: {os.getcwd()}")
    #print(f"Json file path: {json_path}")
    with open('./Emotion_Detection_FER/'+ID +'.json', 'r') as file:
        json_data = json.load(file)

    # Initialize a dictionary to hold the aggregated emotion data
    aggregated_emotions = {
        "angry": 0.0,
        "disgust": 0.0,
        "fear": 0.0,
        "happy": 0.0,
        "sad": 0.0,
        "surprise": 0.0,
        "neutral": 0.0
    }

    # Aggregate the emotion data
    for entry in json_data:
        for emotion, value in entry["emotions"].items():
            aggregated_emotions[emotion] += value

    # Calculate the average emotion values
    num_entries = len(json_data)
    for emotion in aggregated_emotions:
        aggregated_emotions[emotion] /= num_entries

    # Create the bar plot
    emotions = list(aggregated_emotions.keys())
    values = list(aggregated_emotions.values())

    plt.figure(figsize=(10, 6))
    plt.bar(emotions, values, color='skyblue')
    plt.xlabel('Emotions')
    plt.ylabel('Average Intensity')
    plt.title('Average Emotion Intensities')

    # Save the plot to a file
    plt.savefig( './Emotion_Detection_FER/imagesPlot/'+ID + '.png')
    #os.remove('./Emotion_Detection_FER/videos/'+ID + '.mp4')

