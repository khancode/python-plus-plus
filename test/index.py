print('hello')

x = 0
Xfas = 1
asef1230 = 2
_fas324effs = 3

# Python will bitch
x++
Xfas++
asef1230++
_fas324effs++

# TODO: variable name shouldn't be matched by REGEX but it currently does
123_omar++

# 32123++ # invalid python variable
# Note, our library should still work with commented code such as below
# x++

print(x) # x should be 1
print(Xfas) # equal 2
print(asef1230) # equal 3
print(_fas324effs) # equal 4