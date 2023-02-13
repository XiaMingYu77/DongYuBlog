import { ref } from "vue";

let userID = ref('');
let logState = ref(false);

const path = 'http://www.pathfinder-l.top:8080';


export default {
    userID,
    logState,
    path
}