/* eslint-disable dot-notation */
const mongoose = require('mongoose');
const path = require('path');
const DBController = require('../../../server/database/dbController');
const connectTestDatabase = require('./../lib/connectTestDatabase');
const cloneObject = require('./../lib/cloneObject');
const parseBSONtoJSON = require('./../lib/parseBSONtoJSON');
const readData = require('./../lib/readData');
const replaceMongoServiceSymbols = require('./../lib/replaceMongoServiceSymbols');

const testMongoUri =
  'mongodb://demoman:wgforge1@ds261716.mlab.com:61716/test-db';
connectTestDatabase(testMongoUri);

const controller = new DBController('user');
const testData = {
  userTelegramId: undefined,
  eventId: undefined,
  departmentId: undefined
};
const usersFilePath = path.resolve(
  __dirname,
  '../collectionBackups/users.json'
);
function makeJSON(filePath) {
  const data = readData(filePath);
  return replaceMongoServiceSymbols(parseBSONtoJSON(data));
}
const users = JSON.parse(makeJSON(usersFilePath));

describe('dbController user methods tests', () => {
  it('config test', () => {
    expect(controller).toBeTruthy();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log('tests done, May the Force be with you young Jedi');
  });

  // test('getAllUsers works', done => {
  //   controller.getAllUsers().then(controllerAllUsers => {
  //     expect(controllerAllUsers).toHaveLength(users.length);
  //     controllerAllUsers.forEach((user, i) => {
  //       expect(cloneObject(user)).toEqual(users[i]);
  //     });
  //     done();
  //   });
  // });

  test('getUserByUserId works', done => {
    const userId = users[10]['_id'];
    controller.getUserByUserId(userId).then(controllerUser => {
      expect(cloneObject(controllerUser)).toEqual(users[10]);
      done();
    });
  });

  test('getUserByTelegramId works', done => {
    const userTelegramId = users[2]['telegramId'];
    controller.getUserByTelegramId(userTelegramId).then(controllerUser => {
      expect(cloneObject(controllerUser)).toEqual(users[2]);
      done();
    });
  });

  const newUser = {
    first_name: 'Andrey',
    last_name: 'Sitnik',
    id: 9876543210,
    photo_url: 'http://www.cnn.com',
    username: 'andrusha'
  };
  const newUserInMongoFormat = {
    firstName: newUser.first_name,
    lastName: newUser.last_name,
    telegramId: newUser.id,
    avatar: newUser.photo_url,
    username: newUser.username
  };

  test('createNewUser works', done => {
    controller.createNewUser(newUser).then(async user => {
      expect(await controller.getAllUsers()).toHaveLength(users.length + 1);
      const newUserFromDB = cloneObject(
        await controller.getUserByTelegramId(newUser.id)
      );
      const newUserKeys = Object.keys(newUserInMongoFormat);
      newUserKeys.forEach(key => {
        expect(newUserInMongoFormat.key).toEqual(newUserFromDB.key);
        done();
      });
    });
  });

  test('updateUserInfoByUserId works', async done => {
    const newUserTelegramId = newUser.id;
    const newUserFromDB = await controller.getUserByTelegramId(
      newUserTelegramId
    );
    const userId = newUserFromDB['_id'];
    const updateInfo = {
      username: 'andrusha_sitnik',
      firstName: 'Andrei666',
      lastName: 'Sitnik666',
      avatar: 'http://sitnik.jpg',
      telegramId: 1234567890,
      banned: { status: true, expired: Date.now() + 24000 },
      admin: { permission: 42, password: '1234' },
      created: Date.now()
    };
    await controller.updateUserInfoByUserId(userId, updateInfo);
    const updatedUserFromDB = await controller.getUserByTelegramId(
      newUserTelegramId
    );
    console.log('updated user from db', updatedUserFromDB);
    const allowedKeys = ['username', 'firstName', 'lastName', 'avatar'];
    const deniedKeys = [
      'admin.permission',
      'admin.password',
      'banned.status',
      'banned.expired',
      'created',
      'telegramId'
    ];
    allowedKeys.forEach(key => {
      expect(updatedUserFromDB[key]).not.toEqual(newUserFromDB[key]);
      expect(updatedUserFromDB[key]).toEqual(updateInfo[key]);
    });

    deniedKeys.forEach(key => {
      expect(updatedUserFromDB[key]).toEqual(newUserFromDB[key]);
      expect(updatedUserFromDB[key]).not.toEqual(updateInfo[key]);
    });
    done();
  });

  /*
  test('removeUserByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('getAllUsersByEventId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('putUserEventBYUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('getAllUserEventsByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('removeUserEventByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('removeAllUserEventsByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('setUserDepartmentByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('getUserDepartmentByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('banUserByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('unbanUserByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('assignAdminByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('assignSuperAdminByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('getAdminPropertiesByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });

  test('dischargeAdminByUserId works', done => {
    expect(false).toBeTruthy();
    done();
  });
  */
});
