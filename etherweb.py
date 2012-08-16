#! /usr/bin/python
import pyphilo as db
import sqlalchemy as sa
import flask

# db part
class Page(db.Base):
    name = sa.Column(sa.String(50), nullable=False, index=True)
    content  = sa.Column(sa.Text(), nullable=False)

@db.transactionnal
def default_data():
    pass

# web part
app = flask.Flask(__name__)

@app.route("/<page_name>", methods=["GET","POST"])
@db.transactionnal
def page(page_name):
    if flask.request.method == "GET":
        page = db.session.query(Page).filter(Page.name == page_name).all()
        if page:
            content = page[0].content
        else:
            content = flask.render_template("page.html")
        return content
    else: # POST
        content = flask.request.form["content"]
        page = db.session.query(Page).filter(Page.name == page_name).all()
        if page:
            page = page[0]
            page.content = content
        else:
            page = Page(name=page_name, content=content)
            db.session.add(page)
        return ""


if __name__ == "__main__":
    db.engine.init_sqlite("test.db")

    created = db.init_db()
    if created:
        default_data()

    app.debug = True
    app.run()
    

