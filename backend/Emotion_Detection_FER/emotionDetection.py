import cv2
from fer import FER
import json
import numpy as np
import mediapipe as mp


def emotionDetection(ID):
    # Load the FER detector
    detector = FER()
    # Initialize mediapipe's face mesh
    mp_face_mesh = mp.solutions.face_mesh # חדש
    face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, refine_landmarks=True) # חדש

    video_path= './Emotion_Detection_FER/videos/'+ID + '.mp4'
    print(f"Video file path: {video_path}")
    
    video_capture = cv2.VideoCapture(video_path)

    # Check if the video file opened successfully
    if not video_capture.isOpened():
        print("Error: Could not open video file.")
        return

    # List to store emotion detection results for each frame
    emotion_results = []
    upper_face_movements = 0 # חדש 
    lower_face_movements = 0 # חדש 
    previous_landmarks = None # חדש 

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

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) #חדש
        results = face_mesh.process(rgb_frame)# חדש 
        if results.multi_face_landmarks:# חדש
            for face_landmarks in results.multi_face_landmarks:#חדש 
                current_landmarks = [(int(point.x * frame.shape[1]), int(point.y * frame.shape[0])) for point in face_landmarks.landmark] # חדש 

                if previous_landmarks is not None:# חדש
                    # Define upper face (eyes and eyebrows) and lower face (mouth, jaw, chin) landmarks indices
                    upper_indices = list(range(33, 133)) + list(range(0, 10)) + list(range(200, 230))  # Eyes, eyebrows, and forehead landmarks
                    lower_indices = list(range(0, 33)) + list(range(164, 176))  # Mouth, jaw, chin landmarks חדש

                    # Calculate movements for upper face (eyes and eyebrows)
                    #חדש
                    upper_face_movement = sum(
                        [abs(current_landmarks[i][0] - previous_landmarks[i][0]) + abs(current_landmarks[i][1] - previous_landmarks[i][1]) for i in upper_indices]
                    )

                    # Calculate movements for lower face (mouth, jaw, chin)
                    #חדש 
                    lower_face_movement = sum(
                        [abs(current_landmarks[i][0] - previous_landmarks[i][0]) + abs(current_landmarks[i][1] - previous_landmarks[i][1]) for i in lower_indices]
                    )

                    # Update counters based on movement threshold
                    threshold = 5  # Example threshold חדש
                    if upper_face_movement > threshold:# חדש
                        upper_face_movements += 1 # חדש
                    if lower_face_movement > threshold: #חדש
                        lower_face_movements += 1 #חדש

                previous_landmarks = current_landmarks #חדש   

    # Release the video capture object
    video_capture.release()

    # Save emotion detection results to a file

    json_path =  './Emotion_Detection_FER/'+ID+'.json'
    with open(json_path, 'w') as file:
        json.dump(emotion_results, file)

    print(f'Emotion detection results saved to {json_path}')
    more_frequent_movements = "upper" if upper_face_movements > lower_face_movements else "lower" # חדש
    print("The more frequent movements are in the "+  more_frequent_movements + " face region.") # חדש 
