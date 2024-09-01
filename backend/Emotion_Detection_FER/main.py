import sys
import emotionDetection
import findMostFrequency
import findPlot


def main(id):
    # Call emotionDetection function with id
    emotionDetection.emotionDetection(id)
    
    # Call findMostFrequency function with id
    findMostFrequency.findMostFrequency(id)
    
    # Call findPlot function with id
    # findPlot.createPlot(id)
# This block checks if an ID was provided as a command-line argument when running the script.
if __name__ == "__main__":
    
    if len(sys.argv) > 1:
        #Extract the ID from the command-line arguments
        id = sys.argv[1]
        print(id)
        #Call the main function with the extracted ID
        main(id)
    else:
        print("No ID provided")
