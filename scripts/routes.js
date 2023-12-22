import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, set, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBO6C24jQuAluEmq1I2aZ68f3N4COpI3Co",
  authDomain: "fareease-3e02c.firebaseapp.com",
  databaseURL: "https://fareease-3e02c-default-rtdb.firebaseio.com",
  projectId: "fareease-3e02c",
  storageBucket: "fareease-3e02c.appspot.com",
  messagingSenderId: "569286516763",
  appId: "1:569286516763:web:b374d011a475f9e3ca98be",
  measurementId: "G-LD6GQ6N0PM"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const reference = ref(database)

const editPricingButton = document.getElementById('editPricingButton')
const priceDisplay = document.getElementById('priceDisplay')
const priceInput = document.getElementById('priceInput')
const priceUpdate = document.getElementById('priceUpdate')
const minimumInputRegular = document.getElementById('minimumInputRegular')
const minimumInputDiscounted = document.getElementById('minimumInputDiscounted')
const addOnMultiplierInputRegular = document.getElementById('addOnMultiplierInputRegular')
const addOnMultiplierInputDiscounted = document.getElementById('addOnMultiplierInputDiscounted')

editPricingButton.onclick = function() {
  priceDisplay.style.display = 'none'
  priceInput.style.display = 'flex'
}

priceUpdate.onclick = function () {
  priceDisplay.style.display = 'flex'
  priceInput.style.display = 'none'

  const minimumUpdate = minimumInputRegular.value + '/' + minimumInputDiscounted.value
  const addOnMultiplierUpdate = addOnMultiplierInputRegular.value + '/' + addOnMultiplierInputDiscounted.value

  update(ref(database, 'Pricing'), {Minimum: minimumUpdate, 'Add On Multiplier' : addOnMultiplierUpdate})
}

onValue(reference, (snapshot) => {
  // Get Prices
  const minimums = snapshot.child('Pricing').child('Minimum').val().split('/')
  const addOnMultipliers = snapshot.child('Pricing').child('Add On Multiplier').val().split('/')

  const minimumRegular = document.getElementById('minimumRegular')
  const minimumDiscounted = document.getElementById('minimumDiscounted')
  const addOnMultiplierRegular = document.getElementById('addOnMultiplierRegular')
  const addOnMultiplierDiscounted = document.getElementById('addOnMultiplierDiscounted')

  minimumRegular.innerHTML = '₱' + minimums[0]
  minimumDiscounted.innerHTML = '₱' + minimums[1]
  addOnMultiplierRegular.innerHTML = '₱' + addOnMultipliers[0]
  addOnMultiplierDiscounted.innerHTML = '₱' + addOnMultipliers[1]

  minimumInputRegular.value = minimums[0]
  minimumInputDiscounted.value = minimums[1]
  addOnMultiplierInputRegular.value = addOnMultipliers[0]
  addOnMultiplierInputDiscounted.value = addOnMultipliers[1]

  
  // Get Landmarks
  routesContainer.innerHTML = ''

  const addLandmarkDiv = document.createElement('a') 
  addLandmarkDiv.className = 'content-container add-new-route'
  addLandmarkDiv.id = 'addNewRoute'
  addLandmarkDiv.href = 'new-route.html'

  addLandmarkDiv.innerHTML = 
    '<div class="add-new-route-outline">' +
      '<h1>+ &nbsp; Add new route</h1>' +
    '</div>'

  routesContainer.appendChild(addLandmarkDiv)

  snapshot.child('Routes').forEach((route) => {
    const routesContainer = document.getElementById('routesContainer')
    const routeItem = document.createElement('div')
    routeItem.className = 'route-container content-container'
    routeItem.id = route.key + '-container'

    routeItem.innerHTML = 
      '<div class="list-title">' +
        '<div class="route-name">' +
          '<button id="' + route.key + '">' +
            '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">' +
              '<path ' +
                'd="M151.51,15c9.29,2.22,16,8.23,22.49,14.79Q272,128,370.18,226.08c15.22,15.21,15.26,31.66.12,46.8Q269.77,373.43,169.2,474c-12.64,12.64-30.08,13.4-42.2,2a29,29,0,0,1-2.92-39.42,58.18,58.18,0,0,1,4.67-5q88.86-88.9,177.79-177.76a35.86,35.86,0,0,1,4.74-3.37c-2.18-2.29-3.38-3.61-4.65-4.87Q217.28,156.12,127.87,66.76c-7.88-7.87-11.8-17-9.45-28.14,2.3-10.88,8.91-18.12,19.32-21.92l4.61-1.7Z" />' +
            '</svg>' +
          '</button>' +
          '<h1>' + route.key + '</h1>' +
        '</div>' +
        '<a href="edit-route.html?route=' + route.key + '">' +
          '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">' +
            '<path ' +
              'd="M13,473.14c2.74-10.18,5.62-20.33,8.19-30.55,6.9-27.43,13.61-54.91,20.6-82.31a17.81,17.81,0,0,1,4.47-7.81q127.92-128.16,256-256.16c.86-.86,1.78-1.67,2.29-2.13L405.83,195.42c-.45.48-1.5,1.71-2.64,2.85Q275.78,325.65,148.29,452.94a21.39,21.39,0,0,1-9.33,5.37C102.17,467.7,65.31,476.82,28.47,486a20,20,0,0,0-2.53,1H20.39L13,479.61Z" />'  +
            '<path class="cls-1" d="M13,479.61,20.39,487H13Z" />'  +
            '<path ' +
              'd="M436.13,165.36,334.69,64c9.12-9.12,18.41-18.51,27.81-27.77,4.27-4.21,8.44-8.62,13.23-12.16,18.89-14,46.71-12.94,64.08,2.87C451.64,37.65,463,49,473.73,60.87c15.94,17.59,16.62,44.38,2.42,63.49a64.48,64.48,0,0,1-6,7C458.75,142.78,447.33,154.16,436.13,165.36Z" />' +
          '</svg>' +
        '</a>' +
      '</div>' +

      '<div class="list-header-container">' +
       ' <p>Landmark</p>' +
        '<p>Coordinates</p>' +
      '</div>'

      routesContainer.insertBefore(routeItem, routesContainer.firstChild)

      const landmarkList = document.createElement('div')
      landmarkList.className = 'list-content-container'
      landmarkList.id = route.key + '-landmark-list'      

      route.forEach((landmark) => {
        const landmarkItem = document.createElement('div')
        landmarkItem.className = 'list-item'  

        const landmarkName = landmark.key.split(': ')[1].replaceAll('*', '')

        landmarkItem.innerHTML = 
        '<p>' + landmarkName + '</p>' +
        '<p>' + landmark.val() + '</p>'

        landmarkList.appendChild(landmarkItem)
      })

      const routeContainer =  document.getElementById(route.key + '-container')
      routeContainer.appendChild(landmarkList)

      const toggle = document.getElementById(route.key)

      toggle.onclick = function() {
        const parent = toggle.parentElement.parentElement
        const next = parent.nextSibling
        const nextNext = parent.nextSibling.nextSibling

        if (getComputedStyle(next).display == 'flex') {
          next.style.display = 'none'
          nextNext.style.display = 'none'
          toggle.style.animationName = 'up'
        } else {
          next.style.display = 'flex'
          nextNext.style.display = 'flex'
          toggle.style.animationName = 'down'
        }
      }
  })
})
