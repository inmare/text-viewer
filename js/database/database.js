class Database {
  static currentProject;

  static async initialize() {
    const imgData = await getImage();
    const textData = await getText();

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

    dbOpenRequest.onsuccess = async function () {
      // 임시 데이터 추가하기
      console.log("데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const projects = transaction.objectStore(OBJECT_STORE_NAME);

      // 샘플 데이터 만들기
      const proj = {
        id: "SAMPLE_PROJ", // 유일해야 하는 값. 나중에 랜덤한 해시 붙이기
        name: "PROJECT_NAME",
        lastSaved: new Date(),
        charPerLine: 20,
        linePerPage: 10,
        info: [
          {
            data: imgData,
            size: [200, 200], // [x, y]
            text: textData,
            changedText: null,
            cropPoints: {
              horizontal: [
                0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140,
                150, 160, 170, 180, 190, 200,
              ],
              vertical: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
            },
            lowPercentChar: [
              {
                char: "L",
                index: 0,
              },
              {
                char: "o",
                index: 1,
              },
            ],
          },
          {
            data: imgData,
            size: [200, 200], // [x, y]
            text: textData,
            changedText: null,
            cropPoints: {
              horizontal: [
                0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140,
                150, 160, 170, 180, 190, 200,
              ],
              vertical: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
            },
            lowPercentChar: [
              {
                char: "r",
                index: 2,
              },
              {
                char: "e",
                index: 3,
              },
            ],
          },
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

  static getAllProjects() {
    return new Promise((resolve, reject) => {
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
          resolve(request.result);
        };

        request.onerror = function () {
          console.log("Error", request.error);
        };
      };
    });
  }

  static getProjectFromId(id) {
    return new Promise((resolve, reject) => {
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

        const request = projects.get(id);

        request.onsuccess = function () {
          resolve(request.result);
        };

        request.onerror = function () {
          console.log("Error", request.error);
        };
      };
    });
  }

  static deleteProjectFromId(id) {
    return new Promise(() => {
      const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

      dbOpenRequest.onerror = function () {
        console.error("Error", dbOpenRequest.error);
      };

      dbOpenRequest.onsuccess = function () {
        // 임시 데이터 추가하기
        console.log("데이터 베이스 불러오기 성공");
        const db = dbOpenRequest.result;
        const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
        const projects = transaction.objectStore(OBJECT_STORE_NAME);

        projects.delete(id);
      };
    });
  }

  static savePage() {
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = function () {
      // 임시 데이터 추가하기
      console.log("데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
      const projects = transaction.objectStore(OBJECT_STORE_NAME);

      const request = projects.put(Database.currentProject);

      request.onsuccess = function () {
        console.log("데이터 저장 성공");
      };

      request.onerror = function () {
        console.log("Error", request.error);
        throw request.error;
      };
    };
  }
}
