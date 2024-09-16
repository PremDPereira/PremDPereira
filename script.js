let array = [];
let sorting = false;
const visualizer = document.getElementById('visualizer');
const sortButton = document.getElementById('sort');
const resetButton = document.getElementById('reset');
const sizeInput = document.getElementById('arraySize');

// Generate a random array
function generateArray(size = 30, min = 10, max = 100) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    renderArray();
}

// Render the array as bars with numbers
function renderArray() {
    visualizer.innerHTML = '';

    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`; // Scale height based on value
        bar.style.width = `${(visualizer.clientWidth / array.length) - 4}px`; // Adjust width based on container size
        const label = document.createElement('span');
        label.textContent = value;
        bar.appendChild(label);
        visualizer.appendChild(bar);
    });
}

// Swap two bars visually
async function swapBars(index1, index2) {
    const bars = document.querySelectorAll('.bar');
    const bar1 = bars[index1];
    const bar2 = bars[index2];

    // Swap the bar heights visually
    const height1 = bar1.style.height;
    const height2 = bar2.style.height;

    bar1.style.height = height2;
    bar2.style.height = height1;

    // Swap the values in the array
    [array[index1], array[index2]] = [array[index2], array[index1]];

    // Update the bar labels to match the new values
    const label1 = bar1.querySelector('span');
    const label2 = bar2.querySelector('span');
    label1.textContent = array[index1];
    label2.textContent = array[index2];

    await new Promise((resolve) => setTimeout(resolve, 300)); // Animation delay
}

// Selection sort with color updates
async function selectionSort() {
    sorting = true;
    const bars = document.querySelectorAll('.bar');
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = 'green'; // Sorted element

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = 'red'; // Current comparing element
            await new Promise((resolve) => setTimeout(resolve, 100)); // Delay

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#3498db'; // Reset previous min element
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'blue'; // New min element
            }

            await new Promise((resolve) => setTimeout(resolve, 100)); // Delay
            bars[j].style.backgroundColor = '#3498db'; // Reset compared element
        }

        if (minIndex !== i) {
            await swapBars(i, minIndex);
        }

        bars[i].style.backgroundColor = 'green'; // Mark sorted element
    }

    bars[n - 1].style.backgroundColor = 'green'; // Mark last element sorted
    sorting = false;
}

// Start sorting
sortButton.addEventListener('click', () => {
    if (!sorting) {
        selectionSort();
    }
});

// Reset array
resetButton.addEventListener('click', () => {
    generateArray(parseInt(sizeInput.value, 10));
});

// Change array size
sizeInput.addEventListener('input', (e) => {
    generateArray(parseInt(e.target.value, 10));
});

// Initialize with default array size
generateArray(30);
