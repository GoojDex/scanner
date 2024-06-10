import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth();

export function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in
            const user = userCredential.user;
            console.log('User logged in:', user);
            showScannerUI();
        })
        .catch((error) => {
            console.error('Login error:', error);
        });
}

export function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registered
            const user = userCredential.user;
            console.log('User registered:', user);
            showScannerUI();
        })
        .catch((error) => {
            console.error('Registration error:', error);
        });
}

export function logoutUser() {
    signOut(auth).then(() => {
        console.log('User logged out');
        showAuthUI();
    }).catch((error) => {
        console.error('Logout error:', error);
    });
}

export function checkUserAuthentication() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User authenticated:', user);
            showScannerUI();
        } else {
            console.log('No user authenticated');
            showAuthUI();
        }
    });
}

function showAuthUI() {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('scanner').style.display = 'none';
    document.getElementById('preview').style.display = 'none';
    document.getElementById('controls').style.display = 'none';
}

function showScannerUI() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('scanner').style.display = 'block';
    document.getElementById('preview').style.display = 'block';
    document.getElementById('controls').style.display = 'block';
}
