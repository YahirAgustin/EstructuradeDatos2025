

class ShellShort:
    
    @staticmethod
    def displayArr(inpupArr):
        
        for k in inpupArr:
            print(k,end=" ")
        print()
        
    def sort(self,inpupArr):
        size = len(inpupArr)
        
        gapsize = size // 2
        
        while gapsize > 0:
            
            for j in range(gapsize,size):
                
                val = inpupArr[j]
                k = j
                while k >= gapsize and inpupArr[k-gapsize] > val:
                    inpupArr[k] = inpupArr[k-gapsize]
                    k = k -gapsize
                inpupArr[k] = val
            gapsize = gapsize // 2    
        return 0
    
if __name__ == "__main__":
    
    inpupArr = [36,34,43,11,15,20,28,45]            
    print ("Arreglo antes de ser ordenado : ")            
    ShellShort.displayArr(inpupArr)
    obj = ShellShort()
    obj.sort(inpupArr)
    print("Arreglo despues de ser ordenado : ")
    ShellShort.displayArr(inpupArr)