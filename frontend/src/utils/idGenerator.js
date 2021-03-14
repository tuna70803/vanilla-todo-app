/**
 * id 생성 제너레이터
 * @returns {number} 생성한 id
 */
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

export default idGenerator;
