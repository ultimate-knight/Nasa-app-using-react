import Main from "./components/Main"
import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import { useEffect, useState } from "react"

function App() {
  const [data, setData]=useState(null)
  const [loading, setLoading]=useState(false)
  const [showModal, setShowModal] = useState(false)
  
  function handleToggleModal(){
    setShowModal(!showModal)
  }
  
  useEffect(() => {
    async function fetchAPIData(){
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      // console.log("NASA_KEY:", NASA_KEY) // Add this line to debug
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`;

      const today=(new Date()).toDateString()
      const localKey=`NASA-${today}`
      if(localStorage.getItem(localKey)){
        const apiData=JSON.parse(localStorage.getItem(localKey)).
        setData(apiData)
        console.log('Fetched from cached today')
        return
      }
      localStorage.clear()

      // console.log("URL:", url) // Add this line to debug
      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])
  
  return (
    <>
      {data ? (<Main data={data} />): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal} />)}
      {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)}
    </>
  )
}

export default App