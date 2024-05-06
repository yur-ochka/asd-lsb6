const variant = 3327;
const variantString = variant.toString();
const n1 = parseInt(variantString[0]);
const n2 = parseInt(variantString[1]);
const n3 = parseInt(variantString[2]);
const n4 = parseInt(variantString[3]);

const n = 10 + n3;

let matrix = [];
const koef = 1 - n3 * 0.01 - n4 * 0.005 - 0.05;
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem = (Math.random() * 2) * koef;
        row.push(Math.floor(elem));
    }
    matrix.push(row); 
}
console.log(matrix);

let undirMatrix = [];
for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) { 
        row.push(matrix[i][j] || matrix[j][i]);
    }
    undirMatrix.push(row);
}
console.log(undirMatrix);

let B = [];
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem = (Math.random() * 2);
        row.push(elem);
    }
    B.push(row); 
}
let C = [];
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem = B[i][j] * 100 * undirMatrix[i][j];
        row.push(Math.ceil(elem));
    }
    C.push(row); 
}
let D = [];
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem;
        if(C[i][j] === 0) elem = 0;
        else elem = 1;
        row.push(elem);
    }
    D.push(row); 
}
let H = [];
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem;
        if(D[i][j] !== D[j][i]) elem = 1;
        else elem = 0;
        row.push(elem);
    }
    H.push(row); 
}
let Tr = [];
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem;
        if(i < j) elem = 1;
        else elem = 0;
        row.push(elem);
    }
    Tr.push(row); 
}
let W = [[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0]];
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) { 
        let elem = (D[i][j] + H[i][j] + Tr[i][j]) * C[i][j];
        if(W[i][j] === 0)
        {
            W[i][j] = elem;
            W[j][i] = elem;
        }
    }
}
console.log(W);

 // Розміщення вершин у колі
 const nodePositions = [];
 const radius = 450;
 const centerX = 500;
 const centerY = 500;
 const angleIncrement = (2 * Math.PI) / (n - 1);      
        
 for (let i = 0; i < n - 1; i++) {
    const x = centerX + radius * Math.cos(i * angleIncrement);
    const y = centerY + radius * Math.sin(i * angleIncrement);
    nodePositions.push({ x, y });
} 
const x = centerX;
const y = centerY;
nodePositions.push({ x, y });

// Малюємо граф на canvas
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Малюємо зв'язки між вершинами
ctx.strokeStyle = 'black';
ctx.font = '18px Arial';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Малюємо лінію між вершинами (зв'язок), якщо існує зв'язок між ними
        if (undirMatrix[i][j] == 1) {
            if(i !== j) {
                ctx.beginPath();
                ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
                ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
                ctx.stroke();
                const midX = (nodePositions[i].x + nodePositions[j].x) / 2;
                const midY = (nodePositions[i].y + nodePositions[j].y) / 2;           
                const weight = W[i][j];
                ctx.fillText(weight.toString(), midX, midY);
            } else {
                selfCircle(i);
            }
        }
    }
}      

// Малюємо вершини
for (let i = 0; i < n; i++) {
    ctx.fillStyle = 'grey';
    ctx.beginPath();
    ctx.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'white'; 
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}

function selfCircle(i) {
    let x, y;

    const offsetX = nodePositions[i].x < canvas.width / 2 ? -30 : 30;

    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5);
    ctx.stroke();
    ctx.closePath();
}

const colorVisitedNode = (node) => {
    let i = node;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'white'; 
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}
const colorVisitedNodeConnections = (node1, node2) =>{
    let i = node1;
    let j = node2;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';           
    ctx.beginPath();
    ctx.moveTo(nodePositions[j].x, nodePositions[j].y);
    ctx.lineTo(nodePositions[i].x, nodePositions[i].y);
    ctx.stroke();
    ctx.fillStyle = 'red';           
}

class Graph {
    constructor(numNodes) {
        this.numNodes = numNodes;
        this.adjList = [];
        for (let i = 0; i < numNodes; i++) {
            this.adjList.push([]);
        }    
    }

    addEdge(i, j) {
        this.adjList[i].push(j);
    }

    getNodes() {
        const nodes = [];
        for (let i = 0; i < this.numNodes; i++) {
            nodes.push(i);
        }
        return nodes;
    }

    getConnectedNodes(node) {
        let connected = [];
        for(let j = 0; j < this.adjList[node].length; j++)
        {
            connected.push(this.adjList[node][j]);
        }
        return connected;
    }

    getConnectedNodesToArray(arrOfNodes) {
        const connectedToArray = new Set();
        for (let node of arrOfNodes) {
            let connected = this.getConnectedNodes(node);
            for (let n of connected) {
                connectedToArray.add(n);
            }
        }
        return Array.from(connectedToArray);
    }
}

const graph = new Graph(n);
for(let i = 0; i < n; i++)
{
    for(let j = 0; j < n; j++)
    {
        if(undirMatrix[i][j] === 1 && i != j)
        graph.addEdge(i, j);
    }
}

let visited = [0];
let queue = graph.getNodes();
colorVisitedNode(0);
let sum = 0;

const nextStep = () => {
    for(let node of visited)
    {
        if(queue.includes(node))
        {
            queue.splice(queue.indexOf(node), 1);         
        }
    }
    console.log(queue);
    let connectedToAray = graph.getConnectedNodesToArray(visited);
    for(let node of visited)
    {
        if(connectedToAray.includes(node))
        {
            connectedToAray.splice(connectedToAray.indexOf(node), 1);         
        }
    }
    let smallestEdgeValue = 9999999;
    let smallestEdgeStart = -1;
    let smallestEdgeEnd = -1;
    for(let connectedNode of connectedToAray)
    {
        for(let visitedNode of visited)
        {
            if(graph.adjList[visitedNode].includes(connectedNode))
            {
                if(W[visitedNode][connectedNode] < smallestEdgeValue)
                {
                    smallestEdgeValue = W[visitedNode][connectedNode];
                    smallestEdgeStart = visitedNode;
                    smallestEdgeEnd = connectedNode;
                }
            }
        }
    }
    colorVisitedNodeConnections(smallestEdgeStart, smallestEdgeEnd);
    colorVisitedNode(smallestEdgeEnd);
    visited.push(smallestEdgeEnd);
    sum += smallestEdgeValue;
    console.log(visited);
    console.log(sum);
}
