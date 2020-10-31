export function validate_names(e)
{
    if(/^[A-Za-z\'\-\s]+$/g.test(e.value))
        return true;
    else
        return false;
}

export function validate_titles(e)
{
    if(/^[A-Za-z\s\d]+$/i.test(e.value))
        return true;
    else
        return false;
}

export function validate_description(e)
{
    if(/^[A-Za-z\d\s\'\"\,\.\-]+$/i.test(e.value))
        return true;
    else
        return false;
}

export function validate_hashtag(e)
{
    if(/(^(([\#]+[\w\d]{1,})+([\,]{1,1})?)*)+$/i.test(e.value))
        return true;
    else
        return false;
}

export function isEmpty(e)
{
    if(e.length == 0)
        return true;
    else
        return false;
}