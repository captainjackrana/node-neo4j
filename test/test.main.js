var should = require('should'),
    neo4j = require('../main');

var url = 'http://localhost:7474';

var db = new neo4j(url);

describe('Testing Node specific operations for Neo4j', function(){
    
    describe('=> Create a Node', function(){
        var node_id;

        describe('-> A simple valid node insertion', function(){
            it('should return the JSON for that node', function(done){
                db.InsertNode({name:'foobar'}, function(err, result){

                    node_id = result.id;

                    result.should.not.equal(null);
                    result.data.name.should.equal('foobar');
                    result.id.should.not.equal('');
                    done();
                });
            });
        });

        // Remove Node afterwards.
        after(function(done){
           db.DeleteNode(node_id, function(err, result){
              done(); 
           });
        });
    });

    
    describe('=> Delete a Node', function(){
        
        var node_id;
        
        // Insert a Node.
        before(function(done){
            db.InsertNode({name:'foobar'}, function(err, result){
                node_id = result.id;
                done();
            });
        })
        
        describe('-> Deleting an existing Node without Relationships', function(){
            it('should delete the Node without issues', function(done){
                db.DeleteNode(node_id, function(err, result){
                    result.should.equal(true);
                    done(); 
                });
            });
        });
        
        describe('-> Delete an non-existig Node', function(){
           it('should return false as a result since Node cannot be found', function(done){
               db.DeleteNode(node_id, function(err, result){
                  result.should.equal(false);
                  done(); 
               });
           });
        });
        
        // it('should return a valid response', function(err, result){
        //     console.log(node_self);
        //     db.DeleteNode(node_self, function(err, result){
        //         result.should.not.equal(null);
        //         done();
        //     });
        // });
    });
    
    describe('=> Read a Node', function(){
       
       var node_id;
       
       //Insert a Node.
       before(function(done){
          db.InsertNode({name:'foobar'}, function(err, node){
             node_id = node.id;
             done(); 
          });
       });
       
       describe('-> Read an existing Node', function(){
           it('should return the JSON for that node', function(done){
              db.ReadNode(node_id, function(err, result){
                 result.data.name.should.equal('foobar');
                 result.id.should.equal(node_id);
                 done();
              });
           });
       });
       
       // Remove Node afterwards.
       after(function(done){
          db.DeleteNode(node_id, function(err, result){
             done(); 
          });
       });
       
       describe('-> Read an non-existing Node', function(){
          it('should return null for the node and the error messsage', function(done){
             db.ReadNode(99999999, function(err, result){
                should.not.exist(result);
                done(); 
             });
          });
       });
       
    });
    
    describe('=> Update a Node', function(){
       var node_id;
       
       //Insert a Node.
       before(function(done){
          db.InsertNode({name:'foobar'}, function(err, node){
             node_id = node.id;
             done(); 
          });
       });
       
       describe('-> Update an existing Node', function(){
          it('should return the JSON for that node', function(done){
             db.UpdateNode(node_id, {name:'foobar2'}, function(err, result){
                 should.not.exist(err);
                 result.should.equal(true);                 
                 done();
             });
          });
       });
       
       // Remove Node afterwards.
       after(function(done){
           db.DeleteNode(node_id, function(err, result){
               done(); 
           });
       });
       
    });
   
});