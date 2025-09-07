package com.laioffer.twich.config;

public class ProxyConfig {

    public static void setGlobalProxy(String httpProxyHost, int httpProxyPort) {
        // 设置 HTTP 代理
        System.setProperty("http.proxyHost", httpProxyHost);
        System.setProperty("http.proxyPort", String.valueOf(httpProxyPort));

        // 设置 HTTPS 代理
        System.setProperty("https.proxyHost", httpProxyHost);
        System.setProperty("https.proxyPort", String.valueOf(httpProxyPort));
    }
}
