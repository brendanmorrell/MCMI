import database from '../firebase/firebase';

export const addTest = (test = []) => ({
  type: 'ADD_TEST',
  test,
});

export const startAddTest = (testData = {}) => (dispatch, getState) => {
  const { uid } = getState().auth;
  const {
    name,
    questions,
    scoreDate,
    note = '',
  } = testData;

  const test = {
    name,
    questions,
    scoreDate,
    note,
  };

  database.ref(`users/${uid}/tests`).push({ test })
    .then(ref => dispatch(addTest({
      id: ref.key,
      ...test,
    })));
};

export const removeTest = id => ({
  type: 'REMOVE_TEST',
  test: {
    id,
  },
});
export const startRemoveTest = id => (dispatch, getState) => {
  const { uid } = getState().auth;
  database.ref(`users/${uid}/tests/${id}`).remove()
    .then(() => dispatch(removeTest(id)));
};
export const editTest = (id, {
  name,
  scoreDate,
  questions,
  note = '',
}) => ({
  type: 'EDIT_TEST',
  test: {
    id,
    name,
    scoreDate,
    questions,
    note,
  },
});

export const startEditTest = (id, testData) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database.ref(`users/${uid}/tests/${id}`)
      .set({ ...testData })
      .then(() => dispatch(editTest(id, testData)));
  };
};


export const setTests = tests => ({
  type: 'SET_TESTS',
  tests,
});


export const startSetTests = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database.ref(`users/${uid}/tests`)
      .once('value')
      .then((snapshot) => {
        const tests = [];
        snapshot.forEach((childSnapshot) => {
          const wtf = childSnapshot.val().test ? childSnapshot.val().test : childSnapshot.val();
          tests.push({
            id: childSnapshot.key,
            ...wtf,
          });
        });
        dispatch(setTests(tests));
      });
  };
};
