clear
# manipulator constants
a = 150
b = 190

# generate angles in radians
res = 30
alpha = linspace(45, 90, res)
beta = linspace(110, 150, res)

for i = 1:numel(alpha)
  for j = 1:numel(beta)
    x(i,j) = a * cosd(alpha(i)) + b * cosd(alpha(i) - beta(j))
    y(i,j) = a * sind(alpha(i)) + b * sind(alpha(i) - beta(j))
  end
end

# generate linear approximation
res = 15
x_lin = linspace(120, 170, res)
y_lin = linspace(-10, 10, res)
alpha_angles = zeros(res,res)
beta_angles = zeros(res,res)

for i = 1:numel(x_lin)
  for j = 1:numel(y_lin)
    cost = Inf
    
    for k = 1:numel(alpha)
      for l = 1:numel(beta)
        cost_temp = (x(k,l) - x_lin(i))^2 + (y(k,l) - y_lin(j))^2
        cost = min(cost, cost_temp)
        
        if (cost == cost_temp)
          alpha_angles(i,j) = alpha(k)
          beta_angles(i,j) = beta(l)
        endif
        
      end
    end
    
  end
end

save("inverse kinematics.txt", "alpha_angles", "beta_angles", "x_lin", "y_lin")

dlmwrite("alpha.csv", alpha_angles, "delimiter", "\t", "precision", 3)
dlmwrite("beta.csv", beta_angles, "delimiter", "\t", "precision", 3)
dlmwrite("x_lin.csv", x_lin, "delimiter", "\t", "precision", 3)
dlmwrite("y_lin.csv", y_lin, "delimiter", "\t", "precision", 3)