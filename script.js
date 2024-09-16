const arrayContainer = document.getElementById('arrayContainer');
const sizeSlider = document.getElementById('sizeSlider');
let array = [];
let arraySize = sizeSlider.value;

function generateArray(size) {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${600 / array.length}px`;
        arrayContainer.appendChild(bar);
    });
}

async function cycleSort() {
    const bars = document.querySelectorAll('.bar');
    let n = array.length;
    
    // Cycle Sort Algorithm
    for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
        let item = array[cycleStart];
        let pos = cycleStart;

        // Find position where we put the element
        for (let i = cycleStart + 1; i < n; i++) {
            if (array[i] < item) {
                pos++;
            }
        }

        // If the item is already in the correct position
        if (pos === cycleStart) continue;

        // Skip duplicate elements
        while (item === array[pos]) {
            pos++;
        }

        // Swap the item to its correct position
        [array[pos], item] = [item, array[pos]];
        await updateBars(bars, pos, array[pos]);  // Visual update

        // Rotate the rest of the cycle
        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < n; i++) {
                if (array[i] < item) {
                    pos++;
                }
            }

            while (item === array[pos]) {
                pos++;
            }

            [array[pos], item] = [item, array[pos]];
            await updateBars(bars, pos, array[pos]);  // Visual update
        }
    }
}

// Adding a delay function to simulate animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Update bars with animation and a small delay
async function updateBars(bars, pos, item) {
    bars[pos].style.height = `${item * 3}px`;
    bars[pos].style.backgroundColor = 'red';
    await sleep(300);  // Delay for 300ms so changes are visible
    bars[pos].style.backgroundColor = '#4CAF50';
}

sizeSlider.addEventListener('input', () => {
    arraySize = sizeSlider.value;
    generateArray(arraySize);
});

document.getElementById('startSort').addEventListener('click', cycleSort);
document.getElementById('resetArray').addEventListener('click', () => {
    generateArray(arraySize);
});

window.onload = () => generateArray(arraySize);
function displayArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${600 / array.length}px`;
        bar.style.position = 'relative';  // To position the text inside the bar

        // Add a number label inside each bar
        const label = document.createElement('div');
        label.classList.add('bar-label');
        label.innerText = value;
        label.style.position = 'absolute';
        label.style.bottom = '0';  // Align the text at the bottom of the bar
        label.style.width = '100%';  // Center align text
        label.style.textAlign = 'center';
        label.style.color = '#fff';  // White color for better contrast
        label.style.fontWeight = 'bold';  // Bold text for readability

        bar.appendChild(label);  // Add the label to the bar
        arrayContainer.appendChild(bar);
    });
}
async function updateBars(bars, pos, item) {
    // Update the bar height and number
    bars[pos].style.height = `${item * 3}px`;
    bars[pos].style.backgroundColor = 'red';

    // Update the label inside the bar
    const label = bars[pos].querySelector('.bar-label');
    label.innerText = item;

    // Add a delay for visualization
    await sleep(300);

    // Change color to indicate sorted element
    bars[pos].style.backgroundColor = '#4CAF50';
}