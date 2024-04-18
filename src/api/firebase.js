import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  GithubAuthProvider, 
  GoogleAuthProvider,
  signInWithPopup, 
  signOut, 
  updateProfile, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signInWithRedirect
} from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

// Firebase 구성 정보
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // Firebase 프로젝트 API 키
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // Firebase 인증 도메인
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // Firebase 프로젝트 ID
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, // Firebase 데이터베이스 URL
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 및 데이터베이스 객체 생성
const auth = getAuth(); // Firebase 인증 객체
const database = getDatabase(app); // Firebase 데이터베이스 객체

// 사용자 등록 함수
export function register({ email, password, name, photo }) {
  console.log('firebase:register():', email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo // 사용자 프로필 업데이트
      })
    })
    .then(() => {logout()}) // 로그아웃
    .catch(console.error);
}

// 로그인 함수
export function login({ email, password }) {
  console.log('firebase.js:login(): ', email, password);
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

// 깃허브 로그인 함수
export function loginWithGithub() {
  const provider = new GithubAuthProvider(); // 깃허브 인증 제공자 객체 생성
  signInWithPopup(auth, provider) // 팝업 창을 통한 깃허브 로그인
    .catch(console.error);
}

// 구글 로그인 함수
export function loginWithGoogle() {
  const provider = new GoogleAuthProvider(); // 구글 인증 제공자 객체 생성
  signInWithRedirect(auth, provider) // 리디렉션을 통한 구글 로그인
    .catch(console.error);
}

// 로그아웃 함수
export function logout() {
  signOut(auth).catch(console.error); // Firebase 인증으로부터 로그아웃
}

// 사용자 인증 상태 변경 감지 함수
export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser); // 사용자 상태 변경 시 콜백 함수 호출
  });
}

// 관리자 사용자 확인 함수
async function adminUser(user) {
  return get(ref(database, 'admins')) // 'admins' 데이터베이스에서 관리자 목록 가져오기
    .then(snapshot => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(admins);
        const isAdmin = admins.includes(user.uid); // 사용자가 관리자인지 확인
        return {...user, isAdmin};
      }
      return user;
    });
}

// 사용자 목록 가져오는 함수
export async function getUserList() {
  console.log('getUserList()');
  return getAuth().listUsers(100) // 최대 100명의 사용자 목록 가져오기
    .then(result => {
      result.users.map(user => {
        console.log(user.toJSON()); // 사용자 정보 콘솔 출력
      })
      return result.users
    })
    .catch(console.error);
}
