### Default template Laravel 8 + Angular 11 with docker
---

* Services
php:7.4-fpm
nginx latest
---
* How start
docker composer up -d --build
expose port 81
front is default route /
backend in /api