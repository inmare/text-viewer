class Database {
  static initialize() {
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    // 처음 데이터 베이스를 생성해서 버전이 0일때
    dbOpenRequest.onupgradeneeded = function () {
      const db = dbOpenRequest.result;
      db.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("데이터 베이스 생성 성공");
    };

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = function () {
      // 임시 데이터 추가하기
      console.log("데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const projects = transaction.objectStore(OBJECT_STORE_NAME);

      const proj = {
        id: "SAMPLE_PROJ", // 유일해야 하는 값. 나중에 랜덤한 해시 붙이기
        name: "SAMPLE_NAME",
        lastSaved: new Date(),
        charPerLine: 230,
        linePerPage: 168,
        images: [
          // information about image
        ],
      };

      // 이미 존재하는 id라면 덮어쓰기를 하기위해 put으로 넣음
      const request = projects.put(proj);

      request.onsuccess = function () {
        console.log("데이터 입력 성공");
      };

      request.onerror = function () {
        console.log("Error", request.error);
      };
    };
  }

  static callDatabase() {
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = function () {
      // 임시 데이터 추가하기
      console.log("데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readonly");
      const projects = transaction.objectStore(OBJECT_STORE_NAME);

      // 프로젝트의 갯수가 적을 거라고 가정하고 getAll사용
      // 나중에는 cursor를 사용하는 것도 고려해보기
      const request = projects.getAll();

      request.onsuccess = function () {
        const result = request.result;
        DataView.updateDataView(result);
      };

      request.onerror = function () {
        console.log("Error", request.error);
      };
    };
  }
}
