const getConnection = require("../../database/connection");
const BreadRepository = require("../../repositories/pet/bread-repository");

exports.findAllBreads = () => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await BreadRepository.findAllBreads(connection);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.findBreadByBreadNo = (breadNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    try {
      const result = await BreadRepository.findBreadByBreadNo(
        connection,
        breadNo
      );
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.createBread = (breadName) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await BreadRepository.createBread(connection, breadName);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.updateBread = (breadDTO) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await BreadRepository.updateBread(connection, breadDTO);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};

exports.deleteBread = (breadNo) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();
    try {
      const result = await BreadRepository.deleteBread(connection, breadNo);
      connection.commit();
      resolve(result);
    } catch (err) {
      connection.rollback();
      reject(err);
    } finally {
      connection.end();
    }
  });
};
