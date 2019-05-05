print('hello')

x = 0
Xfas = 1
asef1230 = 2
_fas324effs = 0
test_under_score = 9

# Python will bitch
x++
Xfas++
asef1230++
_fas324effs--
test_under_score--;

# 32123++ # invalid python variable
# Note, our library should still work with commented code such as below
# x += 1

print(x) # x should be 1
print(Xfas) # equal 2
print(asef1230) # equal 3
print(_fas324effs) # equal -1
print(test_under_score) # equal 8