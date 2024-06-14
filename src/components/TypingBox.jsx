import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import Stats from "./Stats";
import { useTestMode } from "../Context/TestModeContext";

const TypingBox = () => {
    const inputRef = useRef(null);  
    const {testTime} = useTestMode();
    const [countDown, setCountDown] = useState(testTime);
    const [testEnd, setTestEnd] = useState(false);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [testStart, setTestStart] = useState(false);
    const [wordsArray, setWordsArray] = useState(() => generate(50));
    const [currWordIndex, setCurrWordIndex] = useState(0);  // State for the current word index
    const [currCharIndex, setCurrCharIndex] = useState(0);  // State for the current character index

    const [graphData, setGraphData] = useState([]);


    // The wordsSpanRef variable is initialized using useMemo to create an array of 50 references (one for each word in wordsArray).
    // Each reference is created using createRef and is initially set to null.
    // createRef works similarly to useRef, but it's typically used when you need multiple refs, such as in an array.
    // This approach ensures that a new array of refs is created only when wordsArray changes, optimizing performance.
    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(() => createRef(null));
    }, [wordsArray]);


    const startTimer = () => {
        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);
        function timer(){
            setCountDown((latestCountDown) => {

                setCorrectChars((correctChar) => {
                    setGraphData((graphData) => {
                        return [...graphData, [ testTime - latestCountDown + 1, 
                            (correctChar/5) / ((testTime - latestCountDown + 1)/60)
                        ]]
                    })
                    return correctChar;
                })

                if(latestCountDown === 1){
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return latestCountDown -1;
            })
        }
    }

    const resetTest = () => {
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(generate(50));
        resetWordsSpanRefClassname();
        inputFocus();
    }

    const resetWordsSpanRefClassname = () => {
        wordsSpanRef.map((i) => {
            Array.from(i.current.childNodes).map((j) => {
                j.className= '';
            })
        });
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }

    const handleUserInput = (e) => {

        if(!testStart){
            startTimer();
            setTestStart(true);
        }

        // allCurrChars stores the child nodes (characters) of the current word span element.
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        // Handle space key press to move to the next word
        if (e.keyCode === 32) {

            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords + 1);
            }

            if (allCurrChars.length <= currCharIndex) {
                //remove cusor from last place in the word
                allCurrChars[currCharIndex - 1].classList.remove('current-right');
            } else {
                //calculate the missed charecter in word
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));  
                //remove cousor from in between of the words
                allCurrChars[currCharIndex].classList.remove("current");
            }

            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = "current";
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;
        }

        if(e.keyCode === 8){

            if(currCharIndex !== 0){
                if(allCurrChars.length === currCharIndex){

                    if(allCurrChars[currCharIndex - 1].className.includes('extra')){
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += 'current-right';
                    }else{
                         allCurrChars[currCharIndex - 1].className = "current";
                    }
                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }

                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex - 1].className = "current"
                setCurrCharIndex(currCharIndex - 1);
            }

            return
        }

        if(currCharIndex === allCurrChars.length){
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = "incorrect extra current-right"
            allCurrChars[currCharIndex - 1].classList.remove("current-right");
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            setExtraChars(extraChars + 1);
            return;
        }

        // If the pressed key matches the current character in the word, mark it as correct.
        // Otherwise, mark it as incorrect.
        if (e.key === allCurrChars[currCharIndex].innerText) {
            allCurrChars[currCharIndex].className = "correct";
            setCorrectChars(correctChars + 1);
        } else {
            allCurrChars[currCharIndex].className = "incorrect";
            setIncorrectChars(incorrectChars + 1);
        }

        // If the current character is the last character of the word,
        // add "current-right" to its class name.
        // Otherwise, add "current" to the next character.
        if (currCharIndex + 1 === allCurrChars.length) {
            allCurrChars[currCharIndex].className += " current-right";
        } else {
            allCurrChars[currCharIndex + 1].className = "current";
        }

        // Increment the current character index to move to the next character.
        setCurrCharIndex(currCharIndex + 1);
        return
    }

    //calculate Word Press Minute
    const calculateWPM = () => {
        return Math.round((correctChars/5)/(testTime/60));
    }

    //calculate accuracy
    const calculateAcc = () => {
        return Math.round((correctWords/currWordIndex) * 100);
    }

    const inputFocus = () => {   
        // This function sets focus to the input element by calling the focus method on the inputRef reference.
        inputRef.current.focus();
    }

    useEffect(() => {
        resetTest();
    },[testTime]);

    useEffect(() => {
        // This useEffect hook calls inputFocus to set focus on the input element when the component first mounts.
        inputFocus();
        // wordsSpanRef[0].current.childNodes[0].className = "current";
        if (wordsSpanRef[0].current) {
      wordsSpanRef[0].current.childNodes[0].className = "current";
    }
    }, []);

    return (
        <div>
            <UpperMenu countDown={countDown}/>
            {testEnd ? (<Stats wpm={calculateWPM()} accuracy={calculateAcc()} correctChars={correctChars} incorrectChars={incorrectChars} missedChars={missedChars} extraChars={extraChars} graphData={graphData}/>) : (
            <div className="type-box" onClick={inputFocus}> 
                {/* This div, called type-box, stays focused whenever it is clicked. */}
                <div className="words">
                    {wordsArray.map((word, index) => (
                        // wordsArray is a state containing 50 words. Each word is mapped to a separate span.
                        <span className="word" key={index} ref={wordsSpanRef[index]}>
                            {word.split('').map((char, charIndex) => (
                                // Each character of a particular word gets a separate span.
                                // For example, <span>word</span> gets converted into:
                                // <span>w</span><span>o</span><span>r</span><span>d</span>
                                <span key={charIndex}>{char}</span>
                            ))}
                        </span>
                    ))}
                </div>    
            </div>
            )}
            <input 
                type="text" 
                ref={inputRef} 
                onKeyDown={handleUserInput} 
                className="hide-input" 
            />
            {/* 
                This sets the input element to be of type "text".
                ref={inputRef} -- This attaches the input element to the inputRef reference, allowing direct manipulation and focus control.
                onKeyDown={handleUserInput} -- This sets up an event handler for the "keydown" event, calling the handleUserInput function whenever a key is pressed.
                className="hide-input" -- This applies a CSS class named "hide-input" to the input element, likely used to style or hide the input field.
            */}
        </div>
    )
}

export default TypingBox;
