
/***
 * options.flowName - Name of your screen
 * options.dirType - `base` or `latest`
 * options.filePath - folder to write
 * checks for folders base/latest and creates one if not
 */
export function takeScreenshot(options) {
    if (!options.flowName) {
        return new Error("FlowName is mandatory");
    }
    let base64Image;
    //check for the browser
    let browser = utils.getCurrentBrowser();

    // selenium webdriver takes full page screenshot only in chroms
    if (browser === "chrome") {
        base64Image = await nemo.driver.findElement(nemo.wd.By.tagName('body')).takeScreenshot();
    }
    else  //inject the html2canvas script and take full page screenshot
    {
        await nemo.driver.sleep(10000);
        await nemo.driver.executeScript(`
               (function(d, script) {
               script = d.createElement('script');
               script.type = 'text/javascript';
               script.async = true;
               script.onload = function(){
                   html2canvas(document.body,{useCORS:false}).then(function(canvas){
                        window.screenshot = canvas.toDataURL('image/png'); 
                   });
               };
               script.src = document.getElementById("jsContextLink").value;
               d.getElementsByTagName('head')[0].appendChild(script);
               }(document));
               `);
        await nemo.driver.sleep(15000);
        base64Image = await nemo.driver.executeScript("return window.screenshot");
    }

    await utils.writeToFolder()

}