/* eslint-disable dot-notation */
const mongoose = require('mongoose');
const config = require('../../../server/config/config');
const DBController = require('../../../server/database/dbController');
const connectTestDatabase = require('./../lib/connectTestDatabase');
const cloneObject = require('./../lib/cloneObject');
const createTestDatabase = require('./../lib/createTestDatabase');

const testMongoUri =
  'mongodb://demoman:wgforge1@ds261716.mlab.com:61716/test-db';
createTestDatabase(testMongoUri, 'test-db').then(() => {
  connectTestDatabase(testMongoUri);
});

const controller = new DBController('user');
const testData = {
  userTelegramId: undefined,
  eventId: undefined,
  departmentId: undefined
};

describe('dbController user methods tests', () => {
  it('config test', () => {
    expect(controller).toBeTruthy();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log('tests done, May the Force be with you young Jedi');
  });

  /*
  test('getAllUsers works', done => {
    controller.getAllUsers().then(controllerAllUsers => {
      expect(controllerAllUsers).toHaveLength(usersBackup.length);
      usersBackup.forEach((user, i) => {
        expect(user).toEqual(usersBackup[i]);
      });
      done();
    });
  });

  test('getUserByUserId works', done => {
    const userId = usersBackup[10]['_id'];
    controller.getUserByUserId(userId).then(controllerUser => {
      expect(controllerUser).toEqual(usersBackup[10]);
      done();
    });
  });


  test('getUserByTelegramId works', done => {
    const userTelegramId = usersBackup[2]['telegramId'];
    controller.getUserByTelegramId(userTelegramId).then(controllerUser => {
      expect(cloneObject(controllerUser)).toEqual(usersBackup[2]);
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

  test('createNewUser works', done => {
    const mongoPropertyNames = {
      first_name: 'firstName',
      last_name: 'lastName',
      id: 'telegramId',
      photo_url: 'avatar',
      username: 'username'
    };
    const userProps = Object.keys(newUser);
    controller.createNewUser(newUser).then(user => {
      const newMongoUser = cloneObject(user);
      userProps.forEach(property => {
        const mongoProperty = mongoPropertyNames[property];
        expect(newMongoUser[mongoProperty]).toEqual(newUser[property]);
        done();
      });
    });
  });

  test('updateUserInfoByUserId works', async done => {
    const user = await controller.getUserByTelegramId(newUser.id);
    console.log('sitnik: .>>>', user);
    const userId = user['_id'];
    console.log('sitnik id .>>> ', userId);
    const updateInfo = { username: 'andrusha_sitnik' };
    controller.updateUserInfoByUserId(userId, updateInfo).then(updatedUser => {
      console.log('updated sitnik username: >>>', JSON.stringify(updatedUser));
      // expect(updatedUser.username).toEqual(updateInfo.username);
      done();
    });
  });

  
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
