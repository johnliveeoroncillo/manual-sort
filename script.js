const max = 50;
const height = 10;
const width = 20;
const start = performance.now();
function create() {
    console.log('CREATE');
    const data = [];
    for (let i = 1; i <= max; i++) {
        data.push(i);
    }

    const random = randomSort(data);
    initGraphics(random);
    run(random);
}

function randomSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function initGraphics(arr, passed) {
    const parent = document.getElementById('sorter');
    parent.innerHTML = '';
    arr.map((el) => {
        const element = document.createElement('div');
        const p = document.createElement('p');
        p.innerHTML = el;

        element.appendChild(p);

        element.setAttribute('id', el);
        element.setAttribute('class', 'bars');
        element.style.width = width + 'px';
        element.style.height = (height * el) + 'px';
        element.style.display = 'inline-block';
        element.style.border = '0.5px solid #000';
        parent.appendChild(element);
    });

    if (passed) {

        const end = performance.now();

        for (let index = 0; index < arr.length; index++) {
            const current = arr[index];
            const docs = document.getElementsByClassName('bars');
            for (let i = 0; i < docs.length; i++) {
                docs[i].style.background = '';
            }

            const element = document.getElementById(current);
            element.style.background = 'green';

            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const docs = document.getElementsByClassName('bars');
        for (let i = 0; i < docs.length; i++) {
            docs[i].style.background = '';
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        for (let i = 0; i < docs.length; i++) {
            docs[i].style.background = 'green';
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        for (let i = 0; i < docs.length; i++) {
            docs[i].style.background = '';
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        for (let i = 0; i < docs.length; i++) {
            docs[i].style.background = 'green';
        }

        console.log('It took ' + ((end - start)/1000) + ' seconds');
    }
}

async function run(array) {
    console.log('ORIG', array);
    for (let index = 0; index < array.length; index++) {
        const current = array[index];
        const docs = document.getElementsByClassName('bars');
        for (let i = 0; i < docs.length; i++) {
            docs[i].style.background = '';
        }
        const currentDoc = document.getElementById(current);
        currentDoc.style.background = 'red';

        // not first index
        if (index !== 0) {
            const prev_index = index - 1;
            const prev = array[prev_index];

            const prevDoc = document.getElementById(prev);
            prevDoc.style.background = 'yellow';

            if (current < prev) {
                array[prev_index] = current;
                array[index] = prev;
            }
        }

        await new Promise(resolve => setTimeout(resolve, 5));
        
        initGraphics(array);

        await new Promise(resolve => setTimeout(resolve, 5));
    }
    console.log('SORTED', array);
    const passed = check(array);
    if (!passed) {
        return run(array);
    }

    initGraphics(array, passed);
}

function check(array) {
    for (let index = 0; index < array.length; index++) {
        const current = array[index];
        if (array.length !== index) {
            const next = array[index + 1];
            if (current > next) {
                return false;
            }
        }
    }
    return true;
}

create();