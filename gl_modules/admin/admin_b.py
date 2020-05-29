from bson.json_util import dumps
from flask import Blueprint, jsonify, render_template, session

admin_bp = Blueprint('admin_bp', __name__,
                     template_folder='templates',
                     static_folder='static', static_url_path='assets/admin')

"""
   WHEN WE HAVE AUTHORIZED ADMIN, WE WILL GET ALL THE FLAGGED POSTS AND 
   DISPLAY THEM , SO THAT HE CAN DECIDE WHETHER TO DELETE THEM OR RETURN THEM TO SEARCH RESULTS
   
   IF SOMEONE ELSE IS TRYING ACCESS THIS ROUTE WE WILL REDIRECT THEM TO 
   CUSTOM 403 ERROR PAGE 
"""
@admin_bp.route('/admin')
def admin():
    if session.get('authorized_admin'):
        from app import mongo
        flaged_posts = []

        flaged = mongo.db.users.aggregate([

            {"$unwind": '$posts'},
            {"$match": {"posts.flags": {"$gt": 0}}}
            ,
            {"$sort": {"posts.created_at": -1}}

        ])
        for post in flaged:
            flaged_posts.append(
                {
                    'id': str(post['posts']['post_id']),
                    'name': str(post['name']),

                    'user_id': str(post['_id']),

                    'i_feel': (post['posts']['i_feel']),
                    'because': (post['posts']['because']),
                    'action': str(post['posts']['action']),
                    'created_at': post['posts']['created_at'].strftime("%F %H:%M:%S"),

                    'flags': post['posts']['flags'] if 'flags' in post['posts'] else 0

                }
            )

        return render_template('admin/admin.html', flaged_posts=flaged_posts, num=len(flaged_posts))
    else:
        return render_template('errors/403.html')
