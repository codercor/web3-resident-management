// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgeCalculator {
    function calculateAge(uint day, uint month, uint year) public view returns (uint) {
        require(isValidDate(day, month, year), "Invalid date");

        // Current timestamp
        uint currentTime = block.timestamp;

        // Convert birthdate to timestamp
        uint birthTimestamp = timestampFromDate(day, month, year);

        // Calculate age in seconds
        uint ageInSeconds = currentTime - birthTimestamp;

        // Calculate age in years
        uint ageInYears = ageInSeconds / 31536000; // 1 year = 365 days * 24 hours * 60 minutes * 60 seconds

        return ageInYears;
    }

    function timestampFromDate(uint day, uint month, uint year) internal pure returns (uint) {
        // Assume a date format: DD/MM/YYYY
        require(isValidDate(day, month, year), "Invalid date");

        uint timestamp = (year - 1970) * 31536000; // Number of seconds in a year
        timestamp += (year - 1969) / 4 * 86400; // Add extra days for leap years

        uint8[12] memory _daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Add seconds for each month
        for (uint i = 1; i < month; i++) {
            timestamp += _daysInMonth[i - 1] * 86400; // Number of seconds in a day
            if (i == 2 && isLeapYear(year)) {
                timestamp += 86400; // Add one more day for February in a leap year
            }
        }

        // Add seconds for each day
        timestamp += (day - 1) * 86400; // Number of seconds in a day

        return timestamp;
    }

    function isValidDate(uint day, uint month, uint year) internal pure returns (bool) {
        if (year < 1970 || year > 2100) {
            return false;
        }
        if (month < 1 || month > 12) {
            return false;
        }
        if (day < 1 || day > daysInMonth(month, year)) {
            return false;
        }
        return true;
    }

    function daysInMonth(uint month, uint year) internal pure returns (uint) {
        uint8[12] memory _daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 2 && isLeapYear(year)) {
            return 29;
        }
        return _daysInMonth[month - 1];
    }

    function isLeapYear(uint year) internal pure returns (bool) {
        return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
    }
}
