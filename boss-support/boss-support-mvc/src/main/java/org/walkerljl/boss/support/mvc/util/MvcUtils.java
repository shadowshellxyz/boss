package org.walkerljl.boss.support.mvc.util;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.walkerljl.boss.support.mvc.model.context.ServletContext;
import org.walkerljl.toolkit.standard.exception.AppException;

/**
 * MvcUtils
 *
 * @author xingxun
 */
public class MvcUtils {

    /**
     * 重定向
     *
     * @param url
     */
    public static void sendRedirect(String url) {
        MvcUtils.sendRedirect(url, null);
    }

    /**
     * 重定向
     *
     * @param url
     * @param message
     */
    public static void sendRedirect(String url, String message) {
        PrintWriter out = null;
        try {
            StringBuilder str = new StringBuilder();
            if (StringUtils.isNotEmpty(message)) {
                str.append("window.alert('" + message + "');");
            }
            str.append("<script>window.location.replace('");
            str.append(url);
            str.append("');</script>");

            HttpServletResponse response = ServletContext.getResponse();
            response.setContentType("text/html");
            out = response.getWriter();
            out.print(str.toString());
            out.flush();
        } catch (Exception e) {
            throw new AppException(e);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }
}