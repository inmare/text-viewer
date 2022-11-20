class Database {
  static currentProject;

  static async initialize() {
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    // 처음 데이터 베이스를 생성해서 버전이 0일때
    dbOpenRequest.onupgradeneeded = function () {
      const db = dbOpenRequest.result;
      db.createObjectStore(DATA_STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      const imageStore = db.createObjectStore(IMAGE_STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      imageStore.createIndex("IMAGE_INDEX", ["projectId", "page"], {
        unique: true,
      });
      console.log("데이터 베이스 생성 성공");
    };

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = async function () {
      console.log("데이터 베이스 불러오기 성공");
    };
  }

  static getAllProjects() {
    return new Promise((resolve, reject) => {
      const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

      dbOpenRequest.onerror = function () {
        console.error("Error", dbOpenRequest.error);
      };

      dbOpenRequest.onsuccess = function () {
        console.log("데이터 베이스 불러오기 성공");
        const db = dbOpenRequest.result;
        const transaction = db.transaction(DATA_STORE_NAME, "readonly");
        const projects = transaction.objectStore(DATA_STORE_NAME);

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
        console.log("데이터 베이스 불러오기 성공");
        const db = dbOpenRequest.result;
        const transaction = db.transaction(DATA_STORE_NAME, "readonly");
        const projects = transaction.objectStore(DATA_STORE_NAME);

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
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = function () {
      console.log("데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(DATA_STORE_NAME, "readwrite");
      const projects = transaction.objectStore(DATA_STORE_NAME);

      projects.delete(id);
    };
  }

  static savePage() {
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = function () {
      console.log("데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(DATA_STORE_NAME, "readwrite");
      const projects = transaction.objectStore(DATA_STORE_NAME);

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

  static saveImage(imageObj) {
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = function () {
      console.log("이미지 데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(IMAGE_STORE_NAME, "readwrite");
      const images = transaction.objectStore(IMAGE_STORE_NAME);

      const request = images.put(imageObj);

      request.onsuccess = function () {
        console.log("이미지 데이터 저장 성공");
      };

      request.onerror = function () {
        console.log("Error", request.error);
      };
    };
  }

  static loadImage(pageIdx) {
    return new Promise((resolve, _) => {
      const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

      dbOpenRequest.onerror = function () {
        console.error("Error", dbOpenRequest.error);
      };

      dbOpenRequest.onsuccess = function () {
        console.log("이미지 데이터 베이스 불러오기 성공");
        const db = dbOpenRequest.result;
        const transaction = db.transaction(IMAGE_STORE_NAME, "readwrite");
        const images = transaction.objectStore(IMAGE_STORE_NAME);
        const imageIndex = images.index("IMAGE_INDEX");

        const id = Database.currentProject.id;
        const request = imageIndex.get(
          IDBKeyRange.bound([id, pageIdx], [id, pageIdx])
        );

        request.onsuccess = function () {
          console.log("이미지 불러오기 성공");
          resolve(request.result.data);
        };

        request.onerror = function () {
          console.log("Error", request.error);
          throw request.error;
        };
      };
    });
  }

  static deleteImageFromId(id) {
    const dbOpenRequest = indexedDB.open(DATABASE_NAME, 1);

    dbOpenRequest.onerror = function () {
      console.error("Error", dbOpenRequest.error);
    };

    dbOpenRequest.onsuccess = function () {
      console.log("데이터 베이스 불러오기 성공");
      const db = dbOpenRequest.result;
      const transaction = db.transaction(IMAGE_STORE_NAME, "readwrite");
      const images = transaction.objectStore(IMAGE_STORE_NAME);
      const imageIndex = images.index("IMAGE_INDEX");

      const imageCursor = imageIndex.openCursor(
        IDBKeyRange.lowerBound([id, 0])
      );

      imageCursor.onsuccess = function () {
        const cursor = imageCursor.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
    };
  }
}
