package com.example.data.config.startloader;

import com.example.data.common.ClassUtil;
import com.example.data.common.UtilFun;
import com.example.data.entity.menu.Permission;
import com.example.data.entity.role.Role;
import com.example.data.service.permission.IPermissionService;
import com.example.data.service.role.IRoleService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by wanghuiwen on 17-2-12.
 * 服务启动执行
 */
@Component
//@Order(value=2) 多个CommandLineRunner时 控制顺序
public class MyStartupRunner implements CommandLineRunner {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private IPermissionService permissionService;

    @Resource
    private IRoleService roleService;


    public void run(String... strings) throws Exception {

        logger.info ("————————————————————init permission——————————————");
        List<Method> methods = ClassUtil.MethodHasAnnotation (true,RequiresPermissions.class,"com.example.data");
        for (Method m : methods) {
            m.getDeclaringClass ();
            RequiresPermissions r = m.getAnnotation (RequiresPermissions.class);
            Permission p = new Permission ();
            p.setPermission (r.value ()[0]);
            p.setName (r.value ()[0]);
            p.setResourceType (Permission.PRE_TYPE_BUTTON);
            p.setAvailable (Boolean.TRUE);
            if (permissionService.findByName (p.getName ()) == null) {
                permissionService.save (p);
                System.out.println ("类" + m.getDeclaringClass () + "方法" + m.getName () + m.getParameterTypes () + "添加权限---" + r.value ()[0]);
            }

        }
        logger.info ("————————————————————init role——————————————");
        List<Role> roles = roleService.getByname ("admin");
        if (UtilFun.isEmptyList (roles)) {
            logger.debug ("————————————————————role admin is  ——————————————");
        } else {
            Role role = new Role ();
            role.setName ("admin");
            role.setAvailable (true);
            role.setPermissions (new HashSet<Permission>(permissionService.findAll ()));
            roleService.save (role);
        }
    }
}
