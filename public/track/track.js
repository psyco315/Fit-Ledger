import { drawGraph, destroyGraph } from "./trackData.js"

const formDOM = document.querySelector('#weightForm')
const buttons = document.querySelectorAll('.bodyPart')
const originalBtnState = document.querySelector('.thigh').style
const table = document.querySelector('#myTable')
const backBtn = document.querySelector('.prevPage')

const getDate = () => {
    const currDate = new Date()
    const year = currDate.getFullYear();
    const month = String(currDate.getMonth() + 1); // Months are zero-based
    const day = String(currDate.getDate())
    const date = year + '-' + month + '-' + day

    return date
}

const getParam = () => {
    // Get the current URL
    const currentUrl = window.location.href;
    // Create a URL object
    const url = new URL(currentUrl);
    // Get the query parameters
    const queryParams = new URLSearchParams(url.search);

    return queryParams
}

const updateState = () => {
    const key = getParam().get('key')
    const activeTrack = document.querySelector(`.${key}`)
    activeTrack.style.backgroundColor = 'dimgrey'
    activeTrack.style.color = 'aliceblue'
}

const getData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const postData = async (data, url) => {
    try {
        // Send a POST request to the server
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            }
        });
    }
    catch (error) {
        console.log(error)
    }
}

const deleteData = () => {

}

const updateGraph = async () => {
    const key = getParam().get('key')
    const url = `http://localhost:3000/api/v1/track/${key}`
    const trackData = await getData(url)
    destroyGraph()
    drawGraph(trackData, key)
}

const updateGraphBody = async () => {
    const key = getParam().get('key')
    const url = `http://localhost:3000/api/v1/track/body?key=${key}`
    const trackData = await getData(url)
    destroyGraph()
    drawGraph(trackData, key)
}

const setTableHeaders = (bodyPart) => {
    table.innerHTML = `
                <tr>
                    <thead>
                        <th>Date</th>
                        <th>Measurement</th>
                    </thead>
                    <tbody>
                        <!-- Rows will be added here dynamically -->
                    </tbody>
                </tr>
`
}

const setTableData = async (bodyPart) => {
    const tbody = table.getElementsByTagName("tbody")[0];
    let url

    const list1 = ['weight', 'height']
    if (list1.includes(bodyPart)) {
        url = `http://localhost:3000/api/v1/track/${bodyPart}`
    }
    else {
        url = `http://localhost:3000/api/v1/track/body?key=${bodyPart}`
    }
    const data = await getData(url)

    data.forEach(row => {
        const newRow = tbody.insertRow();
        newRow.classList.add("tableRow")
        const dateCell = newRow.insertCell(0);
        const valueCell = newRow.insertCell(1);

        // Set the text content for each cell
        dateCell.textContent = row.date;
        valueCell.textContent = row.trackValue;
    })

}

const updateTable = async (bodyPart) => {
    setTableHeaders(bodyPart)
    await setTableData(bodyPart)
}




backBtn.addEventListener('click', ()=>{
    location.assign('../home/index.html')
})

buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const bodyPart = button.classList[0]

        let key = getParam().get('key')
        const passiveTrack = document.querySelector(`.${key}`)
        passiveTrack.style = originalBtnState

        const queryParams = getParam()
        queryParams.set('key', bodyPart); // Replace 'name' and 'JohnDoe' with your key-value

        // Update the browser URL without reloading the page
        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.pushState(null, '', newUrl);

        const list1 = ['weight', 'height']
        key = getParam().get('key')

        if (list1.includes(key)) {
            await updateGraph()
        }
        else {
            await updateGraphBody()
        }

        updateTable(key)
        updateState()
    })
})

table.addEventListener('click', e => {
    const currRow = e.target.parentElement
    const buttonCell = currRow.insertCell(2);
    const button = document.createElement("button");
    button.textContent = "Delete";

    // Append the button to the cell
    buttonCell.appendChild(button);
})

formDOM.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Gather form data
    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData); // Convert form data to a plain object

    data.date = getDate()
    const key = getParam().get('key')

    const list1 = ['weight', 'height']

    if (list1.includes(key)) {
        const url = `http://localhost:3000/api/v1/track/${key}`
        await postData(data, url)
        await updateGraph()
    }
    else {
        const url = `http://localhost:3000/api/v1/track/body?key=${key}`
        await postData(data, url)
        await updateGraphBody()
    }

    const input = document.getElementById("trackValue");
    input.value = ""

    updateTable(key)
})

document.addEventListener('DOMContentLoaded', async () => {
    const list1 = ['weight', 'height']
    const key = getParam().get('key')

    if (list1.includes(key)) {
        await updateGraph()
    }
    else {
        await updateGraphBody()
    }

    updateTable(key)
    updateState()
})

const tempFunc = async () => {
    const url = 'http://localhost:3000/api/v1/track/weight'
    let response = await getData(url)
    let tempData = response.data
    console.log(tempData)
}

// await tempFunc()
// console.log(table.innerHTML)