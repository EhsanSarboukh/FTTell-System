import cv2 # enabling  to perform tasks such as object detection, facial recognition
from fer import FER # designed for detecting emotions from facial expressions 
import json
import numpy as np
import mediapipe as mp #It offers pre-built solutions for tasks such as face detection.


def emotionDetection(ID):
    # Load the FER detector
    detector = FER()
    # Initialize mediapipe's face mesh
    # mp_face_mesh is a reference to the face mesh module in MediaPipe, which provides a pre-built solution for detecting facial landmarks.
    mp_face_mesh = mp.solutions.face_mesh 
    # Create a FaceMesh object with specific parameters:
    # - static_image_mode=False: Indicates that the input images are from a video stream (not static images).
    # - max_num_faces=1: Limits the detection to one face per frame.
    # - refine_landmarks=True: Enables refining the detected landmarks to provide more accurate facial features.
    face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, refine_landmarks=True) 
    
    # Construct the path to the video file using the provided ID
    video_path= './Emotion_Detection_FER/videos/'+ID + '.mp4'
    print(f"Video file path: {video_path}")
    #Open the video file
    video_capture = cv2.VideoCapture(video_path)

    # Check if the video file opened successfully
    if not video_capture.isOpened():
        print("Error: Could not open video file.")
        return

    # List to store emotion detection results for each frame
    emotion_results = []
    upper_face_movements = 0  
    lower_face_movements = 0  
    previous_landmarks = None  

    # Read video frames until the video ends
    while video_capture.isOpened():
        # Read the next frame from the video
        ret, frame = video_capture.read()

        # If the frame was not read successfully, exit the loop
        if not ret:
            break

        # Detect emotions in the current frame
        emotions = detector.detect_emotions(frame)
        
        # Iterate over each element in the emotions list
        for emotion in emotions:
            # Convert NumPy arrays to lists in emotion
            for key, value in emotion.items():
                if isinstance(value, np.ndarray):
                    emotion[key] = value.tolist()
            
            # Append the modified emotion to emotion_results
            emotion_results.append(emotion)
        #Convert the frame to RGB as required by mediapipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) 
        results = face_mesh.process(rgb_frame) #Process the frame with mediapipe's face mesh
        if results.multi_face_landmarks: #Check if face landmarks are detected
            for face_landmarks in results.multi_face_landmarks:
                #Extract the landmark coordinates and convert them to integer pixel positions
                current_landmarks = [(int(point.x * frame.shape[1]), int(point.y * frame.shape[0])) for point in face_landmarks.landmark] 

                if previous_landmarks is not None:
                    # Define upper face (eyes, eyebrows, forehead) and lower face (mouth, jaw, chin) landmarks indices
                    upper_indices = list(range(33, 133)) + list(range(0, 10)) + list(range(200, 230))  # Eyes, eyebrows, and forehead landmarks
                    lower_indices = list(range(0, 33)) + list(range(164, 176))  # Mouth, jaw, chin landmarks חדש

                    # Calculate the movements for upper face landmarks
                    upper_face_movement = sum(
                        [abs(current_landmarks[i][0] - previous_landmarks[i][0]) + abs(current_landmarks[i][1] - previous_landmarks[i][1]) for i in upper_indices]
                    )

                    # Calculate movements for lower face (mouth, jaw, chin)
                    lower_face_movement = sum(
                        [abs(current_landmarks[i][0] - previous_landmarks[i][0]) + abs(current_landmarks[i][1] - previous_landmarks[i][1]) for i in lower_indices]
                    )

                    # Update counters based on movement threshold
                    threshold = 5  # Example threshold 
                    if upper_face_movement > threshold:
                        upper_face_movements += 1 #Increment counter if upper face movement exceeds threshold
                    if lower_face_movement > threshold: 
                        lower_face_movements += 1 #Increment counter if lower face movement exceeds threshold

                previous_landmarks = current_landmarks   

    # Release the video capture object
    video_capture.release()

    # Save emotion detection results to a file

    json_path =  './Emotion_Detection_FER/'+ID+'.json'
    with open(json_path, 'w') as file:
        json.dump(emotion_results, file)

    print(f'Emotion detection results saved to {json_path}')
    more_frequent_movements = "upper" if upper_face_movements > lower_face_movements else "lower" 
    print("The more frequent movements are in the "+  more_frequent_movements + " face region.") 
