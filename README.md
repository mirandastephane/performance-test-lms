# Performance Test LMS Repository

This repository contains performance tests using K6. It is designed to test different types of performance scenarios, such as load testing, stress testing, and soak testing, across multiple API endpoints.

## Repository Structure

    ├── performance-test-lms                    
    │   ├── scripts/               # K6 test scripts
    │   │   ├── load-test.js       # Load testing script
    │   │   ├── stress-test.js     # Stress testing script
    │   │   ├── soak-test.js       # Soak testing script
    │   ├── config/                # Configuration files
    │   │   ├── environment.json   # Environment variables (e.g., base URL)
    │   ├── utils/                 # Utility functions and endpoints
    ├── .github/workflows/         # GitHub Actions for CI/CD
    │   ├── performance-tests.yml  # Pipeline for running K6 tests
    ├── package.json               # Project dependencies (if needed)
    └── README.md                  # Project documentation (this file)


## Pre-requisites

- K6: Make sure K6 is installed on your machine. You can follow the installation guide here. 
  - Fedora:
    ```bash
    sudo dnf install https://dl.k6.io/rpm/repo.rpm
    sudo dnf install k6
    ```
  - MacOS:
    ```bash
    brew install k6
    ```

## Running the Tests

### Environment Configuration
The base URL and other environment-specific settings are stored in the `config/environment.json` file. Make sure the base URL is correctly set for the API you are testing.
```json
{
"BASE_URL": "https://learn.liferay.com"
}
```

### Running a Load Test
To run the load test, use the following command:
```bash
k6 run performance-test-lms/scripts/load-test.js
```

This will simulate a moderate number of users accessing the API over a short period of time.

### Running a Stress Test
For stress testing, use:
```bash
k6 run performance-test-lms/scripts/stress-test.js
```
This will simulate a high number of users over a short period, testing the system's behavior under heavy load.

### Running a Soak Test
To run a long-duration soak test:
```bash
k6 run performance-test-lms/scripts/soak-test.js
```

### Saving Test Results with Shell Script
A shell script, `run-k6-load-test.sh`, has been provided to automate the process of saving test results into a directory named with the current date and time of execution. This helps to easily organize and archive results for future analysis.

- Ensure the run-k6.sh script has execution permissions:
```bash
chmod +x run-k6-load-test.sh
```
- Execute the script:
```bash
chmod ./run-k6-load-test.sh
```

## Continuous Integration

This repository is set up to run K6 tests automatically via GitHub Actions. The pipeline is defined in `.github/workflows/performance-tests.yml`.

### Triggering Tests
The tests are automatically triggered when code is pushed to the main branch. You can also manually run the tests via the GitHub Actions interface.

### Example GitHub Actions Workflow

```yaml
name: Performance Tests LMS
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install K6
        run: |
          sudo apt update
          sudo apt install -y k6

      - name: Run performance tests
        run: |
          k6 run performance-test-lms/scripts/load-test.js
```

## Analyzing Test Results

K6 outputs results in JSON format, which can be found in the `performance-test-lms/results/` folder. These results can be processed into reports or sent to external monitoring tools, such as Grafana.

```bash
k6 run --out csv=performance-tests-mls/results/load-test-result.csv performance-tests-lms/scripts/load-test.js
```

