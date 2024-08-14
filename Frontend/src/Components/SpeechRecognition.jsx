import React from "react";
import "./../Styles/SpeechRecognition.css";
import { useState, useEffect, useRef } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";

function SpeechRecognition({ onTextChange }) {
  const [text, setText] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(true);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        const resultText = finalTranscript || interimTranscript;
        setText(resultText);
        if (onTextChange) {
          onTextChange(resultText);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      recognition.onend = () => {
        console.log("Speech recognition service disconnected");
      };
    } else {
      console.warn("Web Speech API is not supported by this browser.");
      setSupported(false);
    }
  }, [onTextChange]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(true);
    }
  };

  if (!supported) {
    return;
  }
  if (!listening) {
    onTextChange(text);
  }

  return (
    <div className="mic">
      {listening ? (
        <button onClick={startListening}>
          <CiMicrophoneOn />
        </button>
      ) : (
        <button onClick={stopListening}>
          <CiMicrophoneOff />
        </button>
      )}
    </div>
  );
}

export default SpeechRecognition;
