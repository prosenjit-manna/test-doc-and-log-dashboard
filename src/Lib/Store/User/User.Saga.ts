import { fork, put, takeEvery } from 'redux-saga/effects';
import routes from '../../Routes/Routes';
import { helperSliceActions } from '../Helper/Helper.Slice';
import { userSliceActions } from './User.Slice';
import { notifications } from '@mantine/notifications';
import { userApi } from 'Lib/Api/User/user';
import { ApolloQueryResult } from '@apollo/client';
import { GetCurrentUserQuery } from 'gql/graphql';

function* loginMiddleWare(): any {
    try {
     yield put(userSliceActions.setUser(null));
     const response: ApolloQueryResult<GetCurrentUserQuery> = yield userApi.currentUser();

      notifications.show({
        title: 'Logged in',
        message: 'Successfully logged in',
      });
      yield put(userSliceActions.setUser(response.data));
      yield put(helperSliceActions.setRedirectUrl(routes.dashboard.me.fullPath));
    } catch (e) {
      console.trace(e);
      console.log(e);
    }
}

function* loginSaga() {
  yield takeEvery(userSliceActions.login as any, loginMiddleWare);
}


function* logOutMiddleWare() {
  yield put(helperSliceActions.setRedirectUrl(routes.login.path));
}

function* logOutSaga() {
  yield takeEvery(userSliceActions.logout as any, logOutMiddleWare);
}

export default function* userSaga() {
  yield fork(loginSaga);
  yield fork(logOutSaga);
}
