import { useCallback, useEffect, useRef, useState ,} from 'react'
import './App.css'

function App() {
  const [length, SetLength] = useState(8)
  const [numberAllowed, SetNumberAllowed] = useState(false)
  const [charAllowed, SetCharAllowed] = useState(false)
  const [pass, SetPass] = useState("")


  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(()=>{
    let Password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}[]/?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      Password += str.charAt(char)
      
    }

    SetPass(Password)

  },[length, numberAllowed, charAllowed, SetPass])

  const copyPasswordToclipboard = useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])


  useEffect(() => {
    PasswordGenerator()
  }, [length, numberAllowed ,charAllowed, PasswordGenerator])


 
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 p-3'>
      <h1  className='text-white text-center my-3  font-bold '> Password Genrator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={pass} 
        className='outline-none w-full py-2 px-5 bg-white'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button 
        className='bg-blue-500 font-bold font-weight-500 px-3 py-0.5'
        onClick={copyPasswordToclipboard}
        >Copy</button>
      </div>


      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {SetLength(e.target.value)}} 
          />
          <label className='m-2'>Length:{length}</label>
        </div>


        <div className='flex items-center gap-x-1 m-3'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed} 
          id='numberInput'
          onChange={() => {SetNumberAllowed((prev) => !prev)}}
          /> 
          <label>Number</label>
        </div>


        <div className='flex items-center gap-x-1 m-3'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed} 
          id='numberInput'
          onChange={() => {SetCharAllowed((prev) => !prev)}}
          /> 
          <label>Charactors</label>
        </div>
        
      </div>
      
    </div>
    </>
  )
}

export default App
