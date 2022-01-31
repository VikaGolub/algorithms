const graph = {};
graph["you"] = ["Alice", "Bob", "Claire"];
graph["Claire"] = ["Tom", "Jonny"];
graph["Alice"] = ["Peggy"];
graph["Bob"] = ["Peggy", "Anuj"];
graph["Peggy"] = [];
graph["Anuj"] = [];
graph["Tom"] = [];
graph["Jonny"] = [];

let searchQueue = [...graph["you"]];
const searched = [];

function personIsSeller(person) {
  return person.slice(-1) === "m" ? true : false;
}

function findMangoSeller() {
  while (searchQueue.length) {
    let person = searchQueue.shift();
    let isSeller = personIsSeller(person);
    if (!searched.includes(person)) {
      if (isSeller) {
        return person + " is a mango seller";
      } else if (searchQueue.length === 1) {
        return "There's no mango seller";
      } else {
        searchQueue = [...searchQueue, ...graph[person]];
        searched.push(person);
      }
    }
  }
}

console.log(findMangoSeller());
