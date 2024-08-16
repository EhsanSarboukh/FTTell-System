import sys
import emotionDetection
import findMostFrequency
import findPlot
#emotionDetection.emotionDetection('roseel')
#findMostFrequency.findMostFrequency('roseel')
#findPlot.createPlot('roseel')

def main(id):
    # Call emotionDetection function with id
    emotionDetection.emotionDetection(id)
    
    # Call findMostFrequency function with id
    findMostFrequency.findMostFrequency(id)
    
    # Call findPlot function with id
    # findPlot.createPlot(id)

if __name__ == "__main__":
    
    if len(sys.argv) > 1:
        id = sys.argv[1]
        print(id)
        main(id)
    else:
        print("No ID provided")