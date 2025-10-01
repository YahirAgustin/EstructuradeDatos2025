#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>

using namespace std;

    vector<int> merge_(vector<int>& arr1, vector<int>& arr2) {
    vector<int> result;
    int i = 0, j = 0;

    while (i < arr1.size() && j < arr2.size()) {
        if (arr1[i] < arr2[j]) {
            result.push_back(arr1[i]);
            i++;
        } else {
            result.push_back(arr2[j]);
            j++;
        }
    }

    while (i < arr1.size()) result.push_back(arr1[i++]);
    while (j < arr2.size()) result.push_back(arr2[j++]);

    return result;
}


vector<int> mergeSort(vector<int>& arr) {
    if (arr.size() < 2) return arr;

    int middle = arr.size() / 2;

    vector<int> left(arr.begin(), arr.begin() + middle);
    vector<int> right(arr.begin() + middle, arr.end());

    left = mergeSort(left);
    right = mergeSort(right);

    return merge_(left, right);
}

int main() {
    srand(time(0));


    vector<int> arr(10);
    for (int i = 0; i < 10; i++) {
        arr[i] = rand() % 101;
    }

    vector<int> sorted = mergeSort(arr);

    for (int x : sorted) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
