import downloadGit from 'download-git-repo';

export const downloadLocal = async (registry, projectName) => {
    let api = `github:${registry}`
    return new Promise((resolve, reject) => {
        downloadGit(api, projectName, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}


/**
 * 
 * 
    [git]
    user = dbuser
    password = dbpassword

    [git.registry]
    array[] = chenqf/vue-design
    array[] = chenqf/2
    array[] = chenqf/3
 * 
 */