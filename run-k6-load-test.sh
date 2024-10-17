#!/bin/bash

# Get the absolute path of the current directory
BASE_DIR=$(pwd)

# Create a directory name with the date and time in the format YYYY-MM-DD_HH-MM-SS
DIR_NAME=$(date +"%Y-%m-%d_%H-%M-%S")

# Create the directory inside 'results'
mkdir -p "$BASE_DIR/results/$DIR_NAME"

# Run the K6 test and save the results in the created directory
k6 run --out csv="$BASE_DIR/results/$DIR_NAME/test-results.csv" "$BASE_DIR/scripts/load-test.js"
