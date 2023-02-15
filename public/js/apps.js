console.log('html javascript is working...')


const weatherForm = document.querySelector('form')
const searchval = document.querySelector('input')
const massage1 = document.querySelector("#massage-1")
const massage2 = document.querySelector("#massage-2")

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = searchval.value
    massage1.textContent = 'Loading...'

    // console.log(location)
    if(location == '')
        massage1.textContent = "enter valid location"    
    else{
    fetch('http://localhost:3000/weather?address='+location).then( (response)=> {
    response.json().then((data) => {
        
        if(data.error){
            massage1.textContent = data.error
            massage2.textContent = ''
        }
        else{
            massage1.textContent = data.location
            massage2.textContent = data.forecast
        }
    })
})  }
})