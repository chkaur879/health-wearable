// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
pragma experimental ABIEncoderV2;

contract HealthData{
    struct user{
        string name;
        string date;
        string totalSteps;
        string totalDistance;
        string veryActiveDist;
        string veryActiveMins;
        string moderateActiveDist;
        string fairlyActiveMins;
        string lightActiveDist;
        string lightlyActiveMins;
        string caloriePrediction;
    }
    mapping(string => user) userAnalysis;

    function insUserData(string memory _name, string memory _date, string memory _totalSteps,
        string memory _totalDistance, string memory _veryActiveDist, string memory _veryActiveMins,
        string memory _moderateActiveDist, string memory _fairlyActiveMins, string memory _lightActiveDist,
        string memory _lightlyActiveMins, string memory _caloriePrediction) public returns(string memory ack){
                userAnalysis[_name].name = _name;
                userAnalysis[_name].date = _date;
                userAnalysis[_name].totalSteps = _totalSteps;
                userAnalysis[_name].totalDistance = _totalDistance;
                userAnalysis[_name].veryActiveDist = _veryActiveDist;
                userAnalysis[_name].veryActiveMins = _veryActiveMins;
                userAnalysis[_name].moderateActiveDist = _moderateActiveDist;
                userAnalysis[_name].fairlyActiveMins = _fairlyActiveMins;
                userAnalysis[_name].lightActiveDist = _lightActiveDist;
                userAnalysis[_name].lightlyActiveMins = _lightlyActiveMins;
                userAnalysis[_name].caloriePrediction = _caloriePrediction;
                ack="User Data Inserted!";
                return(ack);
    }

    function getUserData(string memory _name) public view returns(string memory){
        return(userAnalysis[_name].caloriePrediction);
    }
}
