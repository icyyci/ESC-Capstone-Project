package com.example.selenium;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AdminUnregister {
    static String[] myUserName = new String[]{"admin"};
    static String[] myPassword = new String[]{"password"};

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://evening-eyrie-66460.herokuapp.com/");


        for (int i = 0; i < myPassword.length; i++) {
            // get the user name field of the account page
            WebElement username = driver.findElement(By.name("userID"));

            // locate the "Next" button in the account page
            WebElement password = driver.findElement(By.name("password"));

            //clear the inputs first before reentering the value
            username.clear();
            password.clear();

            // send my user name to fill up the box
            username.sendKeys(myUserName[i]);
            //write password
            password.sendKeys(myPassword[i]);

            // login and :)
            WebElement nextButton = driver.findElement(By.className("loginButton"));
            nextButton.click();

            //check access for admin login
            if (driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin")) {
                System.out.println("Login Successful: Admin");
                WebElement tab = driver.findElement(By.xpath("//*[@id=\"root\"]/div/header/div/button"));
                tab.click();
                WebElement registergroup = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/ul[3]/div"));
                registergroup.click();

                java.util.List<WebElement> registerinput = driver.findElements(By.tagName("input"));
                WebElement button = driver.findElement(By.xpath("/html/body/div/div/div/form/button"));
                for (int j = 0; j < registerinput.size(); j++) {
                    registerinput.get(j).clear();
                }
                for (int j = 0; j < registerinput.size(); j++) {
                    if (j == 0) {
                        registerinput.get(j).sendKeys("100");
                    }
                    else if(j == 1 ){
                        registerinput.get(j).sendKeys("100");
                    }
                    else if(j == 2){
                        registerinput.get(j).sendKeys("password");
                    }
                    else {
                        registerinput.get(j).sendKeys("password");
                    }
                }
                button.click();
                Thread.sleep(3000);
                System.out.println("Group successfully registered, correct flow");

                driver.navigate().to("https://evening-eyrie-66460.herokuapp.com/admin");

                WebElement tab2 = driver.findElement(By.xpath("//*[@id=\"root\"]/div/header/div/button"));
                tab2.click();
                WebElement unregistergroup = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/ul[4]/div"));
                unregistergroup.click();

                WebElement unregister = driver.findElement(By.xpath("//*[@id=\"name\"]"));
                unregister.sendKeys("group100");
                WebElement confirm = driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[3]/button[2]"));
                confirm.click();
                System.out.println("Unregister success");
            }
        }
        //driver.quit();
    }
}