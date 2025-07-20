import { useRef, useState } from 'react'
import './App.css'
import type { IVRNode } from './types'
// import PhonePad from './components/PhonePad'
import { useDispatch, useSelector } from 'react-redux'
import { flowData } from './data/flow-data'
import { updateCallStatus, updateDigit } from './store/ivr'

function App() {
  const [currentNode, setCurrentNode] = useState<IVRNode>(flowData[0])
  const [callStatus, setCallStatus] = useState<'idle' | 'active' | 'ended'>('idle')
  const [inputDigits, setInputDigits] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const dispatch = useDispatch()
  const ivrState = useSelector((state: any) => state.ivr)
  // Handle digit input
  const handleDigitPress = (digit: string) => {
    if (callStatus !== 'active') return
    
    setInputDigits(prev => prev + digit)
    dispatch(updateDigit(inputDigits))

    // Find the next node based on the input
    if (currentNode.options?.[digit]) {
      const nextNodeId = currentNode.options[digit]
      const nextNode = flowData.find(node => node.id === nextNodeId)
      if (nextNode) {
        setTimeout(() => {
          setCurrentNode(nextNode)
          setInputDigits('')
          dispatch(updateDigit(''))
          playNodeMessage(nextNode)
        }, 1000)
      }
    }
  }

  // Start the call
  const startCall = () => {
    setCallStatus('active')
    setCurrentNode(flowData[0])
    setInputDigits('')
    dispatch(updateDigit(''))
    playNodeMessage(flowData[0])
    dispatch(updateCallStatus('active'))

  }

  // End the call
  const endCall = () => {
    setCallStatus('ended')
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
    dispatch(updateCallStatus('ended'))
  }

  // Reset the call
  const resetCall = () => {
    setCallStatus('idle')
    setCurrentNode(flowData[0])
    setInputDigits('')
    dispatch(updateDigit(''))
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
    dispatch(updateCallStatus('idle'))
  }

  // Simulate playing the message
  const playNodeMessage = (node: IVRNode) => {
    setIsPlaying(true)
    // In a real app, you would play actual audio here
    // For simulation, we'll just set a timeout
    setTimeout(() => {
      setIsPlaying(false)
      
      // If this is an endpoint node, end the call
      if (node.type === 'hangup' || node.type === 'voicemail' || node.type === 'transfer') {
        setTimeout(() => {
          endCall()
        }, 2000)
      }
    }, 3000)
  }

  // Render the IVR phone pad
  const renderPhonePad = () => {
    const digits = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['*', '0', '#']
    ]

    return (
      <div className='phonepad-block'>
        {digits.map((row) => (
          row.map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigitPress(digit)}
              disabled={callStatus !== 'active'}
            >
              {digit}
            </button>
          ))
        ))}
      </div>
    )
  }

  // Render the current node message
  const renderNodeMessage = () => {
    return (
      <div className='step-block__message'>
        {isPlaying ? (
          <div >
            +
            <span >Playing message...</span>
          </div>
        ) : (
          <p >{currentNode.message}</p>
        )}
      </div>
    )
  }

  console.log(ivrState)

  return (
    <div className='app'>
       <p><a href="./external-page.html">See persistent state on external page</a></p>
      <h1>Visual IVR Prototype</h1>
      
      {/* Call status indicator */}
      <div className='status-block'>
        <div className={`status-block__call-status ${callStatus === 'active' ? 'active' : callStatus === 'ended' ? 'ended' : 'default'}`}>
          {callStatus === 'active' ? 'Call in progress' : callStatus === 'ended' ? 'Call ended' : 'Ready to call'}
        </div>
        
        <div className='status-block__call-control'>
          {callStatus === 'idle' && (
            <button onClick={startCall} className='--idle'>
              Start Call
            </button>
          )}
          {callStatus === 'active' && (
            <button onClick={endCall} className='--active'>
              || End Call
            </button>
          )}
          {callStatus === 'ended' && (
            <button onClick={resetCall} className='--ended'>
               Reset
            </button>
          )}
        </div>
      </div>

      {/* Current node display */}
      <div className='step-block'>
        <h2>Current Step</h2>
        <div className='step-block__info'>
          <p >Type: {currentNode.type}</p>
          <p >Node ID: {currentNode.id}</p>
        </div>
        {renderNodeMessage()}
      </div>

      {/* Input display */}
      <div className='input-block'>
        <span className='input-block__label'>Input:</span>
        <span className='input-block__digit'>{inputDigits || '_'}</span>
      </div>

      {/* Phone pad */}
      { renderPhonePad() }

      {/* IVR flow visualization */}
      <div className='visualization-block'>
        <h2 >Flow</h2>
        <div className='visualization-block__steps'>
          {flowData.map((node) => (
            <div 
              key={node.id} 
              className={`${node.id === currentNode.id ? '--active' : ''}`}
            >
              <div >
                <span >{node.type}</span>
                <span >ID: {node.id}</span>
              </div>
              <p >{node.message}</p>
              {node.options && (
                <div >
                  {Object.entries(node.options).map(([digit, nextNodeId]) => (
                    <div key={digit} >
                      Press {digit} → Node {nextNodeId}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hidden audio element for actual implementations */}
      <audio ref={audioRef} />
    </div>
  )
}

export default App
